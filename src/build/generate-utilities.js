/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssScss = require('postcss-scss');

const scssDir = path.join(__dirname, '..', '..', 'src', 'styles');
const mixinsPath = path.join(scssDir, '..', '..', 'src', 'styles', 'utility-mixins');
const utilitiesPath = path.join(scssDir, '..', '..', 'lib', 'scss', 'utilities.scss');

const statefulUtilitiesRegexp = /\$(active|hover|visited|focus): true/g;

const getRuleName = (mixinDeclaration) => mixinDeclaration.match(/[\w-]+/)[0];

const getStatefulFlags = (mixinDeclaration) =>
  [...mixinDeclaration.matchAll(statefulUtilitiesRegexp)].map((match) => match[1]);

const buildUtilityClass = (name, important = false) => {
  const baseSelector = `.${name}`;
  const selector = important ? `${baseSelector}\\!` : baseSelector;

  return postcss.rule({ selector });
};

const buildStatefulClasses = (name, statefulFlags = [], important = false) => {
  return statefulFlags.map((statefulFlag) => {
    const state = statefulFlag === 'focus' ? 'focus-within' : statefulFlag;
    const baseSelector = `.ym-${statefulFlag}-${name.replace('ym-', '')}$1:${state}`;
    const selector = baseSelector.replace('$1', important ? '\\!' : '');

    return postcss.rule({ selector });
  });
};

const buildImportantDecl = (originalDecl) => {
  return originalDecl.clone({ important: true });
};

const createRuleWithImportantDecls = (rule) => {
  const importantDeclsRule = rule.clone();

  importantDeclsRule.walkDecls((decl) => decl.replaceWith(buildImportantDecl(decl)));

  return importantDeclsRule;
};

const resolveDeclarations = (rule, allDeclarations = {}) => {
  const ruleDeclarations = [];

  rule.walkDecls((decl) => ruleDeclarations.push(decl));
  rule.walkAtRules('include', (includeRule) => {
    const mixinName = getRuleName(includeRule.params);
    const decls = allDeclarations[mixinName];

    if (decls) {
      includeRule.replaceWith(...decls);
    } else {
      console.warn(`Could not find declarations for mixin ${mixinName}`);
    }
  });

  return ruleDeclarations;
};

/**
 * PostCSS plugin that generates utility classes based on the utility-mixin
 * declarations in /src/scss/utility-mixins
 *
 * To understand the AST generated by PostCSS, read PostCSS API documentation
 * http://api.postcss.org/index.html
 */
const generateUtilitiesPlugin = postcss.plugin('postcss-generate-utilities', () => {
  return (root) => {
    const allDeclarations = {};

    root.walkComments((comment) => comment.remove());
    root.walkAtRules('import', (rule) => rule.remove());

    root.walkAtRules('mixin', (rule) => {
      const { params } = rule;
      const mixinName = getRuleName(params);
      const statefulFlags = getStatefulFlags(params);
      const utilityClasses = [
        buildUtilityClass(mixinName),
        ...buildStatefulClasses(mixinName, statefulFlags),
      ];
      // const importantUtilityClasses = [
      //   buildUtilityClass(mixinName, true),
      //   ...buildStatefulClasses(mixinName, statefulFlags, true),
      // ];
      allDeclarations[mixinName] = resolveDeclarations(rule, allDeclarations);
      const importantDeclsRule = createRuleWithImportantDecls(rule);

      utilityClasses.forEach((utilityClass) => {
        utilityClass.append(...rule.clone().nodes);
        root.append(utilityClass);
      });

      // importantUtilityClasses.forEach((utilityClass) => {
      //   utilityClass.append(...importantDeclsRule.clone().nodes);
      //   root.append(utilityClass);
      // });

      rule.remove();
    });
  };
});

function writeFileHeader() {
  try {
    fs.appendFileSync(utilitiesPath, '/* auto-inject-scss-lib */\n');
    console.log(`Successfully wrote header to ${utilitiesPath}`);
  } catch (e) {
    console.error(`Could not write header to ${utilitiesPath}`);
    throw e;
  }
}

function writeUtilities(contents, file) {
  try {
    fs.appendFileSync(utilitiesPath, contents);
    console.log(`Successfully wrote ${file} to ${utilitiesPath}`);
  } catch (e) {
    console.error(`Could not write ${file} to ${utilitiesPath}`);
    throw e;
  }
}

function appendImportToYupmaUi() {
  const yupmaUiPath = path.join(scssDir, '..', '..', 'lib', 'scss', 'yupma_ui.scss');
  const importStatement = `\n@import 'utilities';\n`;

  try {
    fs.appendFileSync(yupmaUiPath, importStatement);
    console.log(`Successfully appended import statement to ${yupmaUiPath}`);
  } catch (e) {
    console.error(`Could not append import statement to ${yupmaUiPath}`);
    throw e;
  }
}

function main() {
  try {
    if (fs.existsSync(utilitiesPath)) {
      fs.unlinkSync(utilitiesPath);
    }

    writeFileHeader();

    const files = fs.readdirSync(mixinsPath);

    files.forEach((file) => {
      const scss = fs.readFileSync(path.join(mixinsPath, file), { encoding: 'utf-8' });

      postcss([generateUtilitiesPlugin])
        .process(scss, { from: file, to: utilitiesPath, syntax: postcssScss })
        .then((result) => {
          writeUtilities(result.css, file)
          if (files.indexOf(file) === files.length - 1) {
            appendImportToYupmaUi();
          }
        })
        .catch((e) => {
          console.log('Could not generate utilities.scss', e);
        });
    });
  } catch (e) {
    console.error(`Could not read ${mixinsPath}`);
    throw e;
  }
}

main();
