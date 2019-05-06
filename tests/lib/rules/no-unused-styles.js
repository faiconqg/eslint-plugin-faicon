/**
 * @fileoverview Detect unused styles JSS in React components
 * @author eslint-plugin-faicon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-unused-styles"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

RuleTester.setDefaultConfig({
  parser: "babel-eslint",
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

var ruleTester = new RuleTester();

ruleTester.run("no-unused-styles", rule, {
  valid: [
    {
      code: `
        const styles = theme => ({
          name: {}
        });
        const Hello = React.createClass({
          render: function() {
            return <Text textStyle={styles.name}>Hello {this.props.name}</Text>;
          }
        });
      `
    },
    {
      code: `
        const Hello = React.createClass({
          render: function() {
            return <Text textStyle={styles.name}>Hello {this.props.name}</Text>;
          }
        });
        const styles = theme => ({
          name: {}
        });
      `
    },
    {
      code: `
        const styles = theme => ({
          name: {}
        });
        const Hello = React.createClass({
          render: function() {
            return <Text style={styles.name}>Hello {this.props.name}</Text>;
          }
        });
      `
    },
    {
      code: `
        const styles = theme => ({
          name: {},
          welcome: {}
        });
        const Hello = React.createClass({
          render: function() {
            return <Text style={styles.name}>Hello {this.props.name}</Text>;
          }
        });
        const Welcome = React.createClass({
          render: function() {
            return <Text style={styles.welcome}>Welcome</Text>;
          }
        });
      `
    },
    {
      code: `
        const styles = theme => ({
          text: {}
        })
        const Hello = React.createClass({
          propTypes: {
            textStyle: Text.propTypes.style,
          },
          render: function() {
            return <Text style={[styles.text, textStyle]}>Hello {this.props.name}</Text>;
          }
        });
      `
    },
    {
      code: `
        const styles = theme => ({
          text: {}
        })
        const styles2 = StyleSheet.create({
          text: {}
        })
        const Hello = React.createClass({
          propTypes: {
            textStyle: Text.propTypes.style,
          },
          render: function() {
            return (
              <Text style={[styles.text, styles2.text, textStyle]}>
               Hello {this.props.name}
              </Text>
             );
          }
        });
      `
    },
    {
      code: `
        const styles = theme => ({
          text: {}
        });
        const Hello = React.createClass({
          getInitialState: function() {
            return { condition: true, condition2: true }; 
          },
          render: function() {
            return (
              <Text
                style={[
                  this.state.condition &&
                  this.state.condition2 &&
                  styles.text]}>
                Hello {this.props.name}
              </Text>
            );
          }
        });
      `
    },
    {
      code: `
        const styles = theme => ({
          text: {},
          text2: {},
        });
        const Hello = React.createClass({
          getInitialState: function() {
            return { condition: true }; 
          },
          render: function() {
            return (
              <Text style={[this.state.condition ? styles.text : styles.text2]}>
                Hello {this.props.name}
              </Text>
            );
          }
        });
      `
    },
    {
      code: `
        const styles = theme => ({
            style1: {
                color: 'red',
            },
            style2: {
                color: 'blue',
            }
        });
        export default class MyComponent extends Component {
            static propTypes = {
                isDanger: PropTypes.bool
            };
            render() {
                return <View style={this.props.isDanger ? styles.style1 : styles.style2} />;
            }
        }
      `
    },
    {
      code: `
        const styles = theme => ({
          text: {}
        })
      `
    },
    {
      code: `
        const Hello = React.createClass({
          getInitialState: function() {
            return { condition: true }; 
          },
          render: function() {
            const myStyle = this.state.condition ? styles.text : styles.text2;
            return (
                <Text style={myStyle}>
                    Hello {this.props.name}
                </Text>
            );
          }
        });
        const styles = theme => ({
          text: {},
          text2: {},
        });
      `
    },
    {
      code: `
        const additionalStyles = {};
        const styles = theme => ({
          name: {},
          ...additionalStyles
        });
        const Hello = React.createClass({
          render: function() {
            return <Text textStyle={styles.name}>Hello {this.props.name}</Text>;
          }
        });
      `
    },
    {
      code: `
        const styles = OtherStyleSheet.create({
          name: {},
        });
        const Hello = React.createClass({
          render: function() {
            return <Text textStyle={styles.name}>Hello {this.props.name}</Text>;
          }
        });
      `
    }
  ],

  invalid: [
    {
      code: `
        const styles = theme => ({
          text: {}
        })
        const Hello = React.createClass({
          render: function() {
            return <Text style={styles.b}>Hello {this.props.name}</Text>;
          }
        });
      `,
      errors: [
        {
          message: "Unused style detected: styles.text"
        }
      ]
    },
    {
      code: `
        const styles = theme => ({
          foo: {},
          bar: {},
        })
        class Foo extends React.Component {
          render() {
            return <View style={styles.foo}/>;
          }
        }
      `,
      errors: [
        {
          message: "Unused style detected: styles.bar"
        }
      ]
    },
    {
      code: `
        const styles = theme => ({
          foo: {},
          bar: {},
        })
        class Foo extends React.PureComponent {
          render() {
            return <View style={styles.foo}/>;
          }
        }
      `,
      errors: [
        {
          message: "Unused style detected: styles.bar"
        }
      ]
    }
  ]
});
