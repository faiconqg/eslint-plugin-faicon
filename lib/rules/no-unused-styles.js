/**
 * @fileoverview Detect unused styles JSS in React components
 * @author Thiago Lins <thiagolins@faicon.com>
 */
"use strict";

const Components = require("../util/Components");
const styleSheet = require("../util/stylesheet");

const StyleSheets = styleSheet.StyleSheets;
const astHelpers = styleSheet.astHelpers;

module.exports = Components.detect((context, components) => {
  const styleSheets = new StyleSheets();
  const styleReferences = new Set();

  function reportUnusedStyles(unusedStyles) {
    Object.keys(unusedStyles).forEach(key => {
      if ({}.hasOwnProperty.call(unusedStyles, key)) {
        const styles = unusedStyles[key];
        styles.forEach(node => {
          const message = [
            "Unused style detected: ",
            key,
            ".",
            node.key.name
          ].join("");

          context.report(node, message);
        });
      }
    });
  }

  return {
    MemberExpression: function(node) {
      const styleRef = astHelpers.getPotentialStyleReferenceFromMemberExpression(
        node
      );
      if (styleRef) {
        styleReferences.add(styleRef);
      }
    },

    // CallExpression: function(node) {
    //   if (astHelpers.isStyleSheetDeclaration(node, context.settings)) {
    //     const styleSheetName = astHelpers.getStyleSheetName(node);
    //     const styles = astHelpers.getStyleDeclarations(node);

    //     styleSheets.add(styleSheetName, styles);
    //   }
    // },

    ArrowFunctionExpression: function(node) {
      if (astHelpers.isStyleSheetDeclaration(node, context.settings)) {
        const styles = astHelpers.getStyleDeclarations(node);
        styleSheets.add("styles", styles);
      }
    },

    "Program:exit": function() {
      const list = components.all();
      if (Object.keys(list).length > 0) {
        styleReferences.forEach(reference => {
          styleSheets.markAsUsed(reference);
        });
        reportUnusedStyles(styleSheets.getUnusedReferences());
      }
    }
  };
});

module.exports.schema = [];
