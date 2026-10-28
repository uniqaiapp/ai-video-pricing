// Structure checks shared by every uniqaiapp repo: one SKILL.md as the source of truth, thin adapters
// that point to it, matching versions, and no forbidden strings anywhere in the tree.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = "ai-video-pricing";
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(m, "SKILL.md must start with YAML frontmatter");
  const fm = {};
  let section = null;
  for (const line of m[1].split("\n")) {
    const top = line.match(/^([a-z_]+):\s*(.*)$/);
    const nested = line.match(/^\s+([a-z_]+):\s*(.*)$/);
    if (top) { section = top[2] === "" ? top[1] : null; fm[top[1]] = top[2] === "" ? {} : top[2]; }
    else if (nested && section) fm[section][nested[1]] = nested[2];
  }
  return fm;
}

test("SKILL.md frontmatter: name equals repo, description single-line and within 1024 chars", () => {
  const fm = frontmatter(read("SKILL.md"));
  assert.equal(fm.name, REPO);
  assert.equal(typeof fm.description, "string");
  assert.ok(fm.description.length > 0 && fm.description.length <= 1024, `description is ${fm.description.length} chars`);
  assert.ok(!fm.description.includes("\n"));
  assert.match(fm.metadata.version, /^\d+\.\d+\.\d+$/);
  assert.equal(fm.metadata.author, "UniqAI");
});

test("versions match across SKILL.md, plugin.json and CHANGELOG.md", () => {
  const fm = frontmatter(read("SKILL.md"));
  const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
  assert.equal(plugin.name, REPO);
  assert.equal(plugin.version, fm.metadata.version);
  assert.deepEqual(plugin.skills, ["./"]);
  const top = read("CHANGELOG.md").match(/^## \[(\d+\.\d+\.\d+)\]/m);
  assert.ok(top, "CHANGELOG needs a ## [x.y.z] entry");
  assert.equal(top[1], fm.metadata.version);
});

test("adapters point at SKILL.md", () => {
  const mdc = read(`.cursor/rules/${REPO}.mdc`);
  assert.match(mdc, /^---\n[\s\S]*alwaysApply: false[\s\S]*\n---\n/);
  assert.ok(mdc.includes("@SKILL.md"));
  assert.ok(read("AGENTS.md").includes("SKILL.md"));
  assert.ok(read("codex/INSTRUCTIONS.md").includes("SKILL.md"));
});

test("SKILL.md body stays under 500 lines and links only to files that exist", () => {
  const md = read("SKILL.md");
  assert.ok(md.split("\n").length < 500);
  for (const m of md.matchAll(/\]\(((?:references|scripts|examples|data)\/[^)#]+)\)/g)) {
    assert.ok(fs.existsSync(path.join(ROOT, m[1])), `SKILL.md links to missing ${m[1]}`);
  }
});

test("repo metadata matches the SKILL and the brand rules", () => {
  const meta = JSON.parse(read(".github/repo.json"));
  assert.equal(meta.name, REPO);
  assert.ok(meta.description.length > 0 && meta.description.length <= 350);
  assert.ok(Array.isArray(meta.topics) && meta.topics.length > 0 && meta.topics.length <= 20);
  assert.ok(meta.homepage.includes(`utm_campaign=${REPO}`));
  const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
  assert.equal(plugin.author.name, "UniqAI");
  assert.equal(plugin.author.email, "support@uniqai.app");
});

const FORBIDDEN = ["aeo" + "ria", "rich" + "peach", "/Users" + "/", "/Volumes" + "/", "node_" + "modules", "sk-" + "ant-", "sk_" + "live", "api_" + "key=", "TODO: " + "fill", "lorem " + "ipsum"];
const TEXT = /\.(md|mjs|js|json|yml|yaml|cff|txt|csv|svg|mdc|editorconfig|gitattributes)$/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

test("no forbidden strings or personal names in any tracked text file", () => {
  const files = walk(ROOT).filter((p) => TEXT.test(p) || /(^|\/)\.(editorconfig|gitattributes)$/.test(p));
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const text = fs.readFileSync(file, "utf8");
    for (const [i, line] of text.split("\n").entries()) {
      if (line.includes("conventions-allow: abs-path")) continue;
      const low = line.toLowerCase();
      for (const bad of FORBIDDEN) {
        if (rel === ".gitignore" && bad === "node_" + "modules") continue;
        assert.ok(!low.includes(bad.toLowerCase()), `${rel}:${i + 1} contains forbidden string "${bad}"`);
      }
      if (/copyright \(c\)/i.test(line)) assert.ok(line.includes("UniqAI"), `${rel}:${i + 1} copyright line without UniqAI`);
    }
  }
  // .gitignore may list the Node dependency folder; nothing else may.
  assert.ok(read(".gitignore").includes("node_" + "modules"));
});

test("no package manifests, lockfiles or dependencies", () => {
  for (const f of ["package.json", "package-lock.json", "requirements.txt", "pyproject.toml"]) {
    assert.ok(!fs.existsSync(path.join(ROOT, f)), `${f} must not exist (zero dependencies)`);
  }
});

test("every brand link in README carries the repo UTM (data source links in the table excepted); one Made-by footer", () => {
  const full = read("README.md");
  // The generated price table cites https://uniqai.app/pricing as a data source, deliberately without UTM.
  const prose = full.replace(/<!-- prices:start -->[\s\S]*?<!-- prices:end -->/, "");
  const links = [...prose.matchAll(/https:\/\/uniqai\.app[^\s)"<]*/g)].map((m) => m[0]);
  assert.ok(links.length > 0 && links.length <= 3, `README has ${links.length} brand links; max 3`);
  for (const l of links) assert.ok(l.includes(`utm_campaign=${REPO}`), `README link without UTM: ${l}`);
  assert.equal((full.match(/Made by <a href/g) || []).length, 1);
});
