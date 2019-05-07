/**
 * @fileoverview Detect unused styles JSS in React components
 * @author eslint-plugin-faicon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-undefined-styles"),
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

ruleTester.run("no-undefined-styles", rule, {
  valid: [
    {
      code: `
      const styles = theme => ({
        progress: {},
        logoDiv: {},
        logoDivImg: {},
        logoImg: {},
        scrollbar: {},
        appName: {},
        drawer: {},
        version: {},
        divFora: {}
      })
      
      export default
      @withStyles(styles)
      @withWidth()
      @inject('router')
      @observer
      class Menu extends Page {
        render() {
          const { classes } = this.props
          const { sidebar } = RealmStore.logos || {}
          const width = this.resolveWidth()
          return (
            <SwipeableDrawer
              open={AppStore.smallToggled}
              anchor="left"
              classes={{ paper: classes.drawer }}
              variant={this.isSmall() ? 'temporary' : 'permanent'}
              onClose={() => (AppStore.smallToggled = false)}
              onOpen={() => (AppStore.smallToggled = true)}
            >
              <div style={{ width: width }} className={classes.divFora} onMouseEnter={() => this.toggleMenu(true)} onMouseLeave={() => this.toggleMenu(false)}>
                {AccessRoutesStore.busy()}
                <div className={classes.logoDiv} id="logo">
                  <div className={classes.logoDivImg} onClick={this.handleLogoClick}>
                    {/*<img
                      className={classes.logoImg}
                      style={{
                        width: width > 69 ? 'auto' : 0
                      }}
                      src={logoWhite}
                      alt="Logo"
                    />*/}
                    {sidebar ? (
                      <img
                        className={classes.logoImg}
                        style={{
                          width: width > 0 ? 'auto' : 0
                        }}
                        src={sidebar}
                        alt="Incentive.me"
                      />
                    ) : (
                      <span className={classes.appName}>
                        {RealmStore.appName ? (width > 69 ? RealmStore.appName : RealmStore.appName.slice(0, 2)) : width > 69 ? 'Nome do Sistema' : 'NS'}
                      </span>
                    )}
                  </div>
                </div>
                <ScrollBar className={classes.scrollbar}>
                  {AccessRoutesStore.busy() ? (
                    <LinearLayout center padding={30}>
                      <CircularProgress className={classes.progress} />
                    </LinearLayout>
                  ) : (
                    <MenuList items={AccessRoutesStore.models} level={0} root onItemClick={this.handleItemClick} path={this.path} />
                  )}
                  <span className={classes.version}>{process.env.REACT_APP_VERSION}</span>
                </ScrollBar>
              </div>
            </SwipeableDrawer>
          )
        }
      }   
      `
    }
  ],
  invalid: [
    {
      code: `
      const styles = theme => ({
        progress: {},
        logoDiv: {},
        logoDivImg: {},
        logoImg: {},
        scrollbar: {},
        appName: {},
        drawer: {},
        version: {},
        divFora: {}
      })
      
      export default
      @withStyles(styles)
      @withWidth()
      @inject('router')
      @observer
      class Menu extends Page {
      
        render() {
          const { classes } = this.props
          const { sidebar } = RealmStore.logos || {}
          const width = this.resolveWidth()
          return (
            <SwipeableDrawer
              open={AppStore.smallToggled}
              anchor="left"
              classes={{ paper: classes.drawer }}
              variant={this.isSmall() ? 'temporary' : 'permanent'}
              onClose={() => (AppStore.smallToggled = false)}
              onOpen={() => (AppStore.smallToggled = true)}
            >
              <div style={{ width: width }} className={classes.divFora} onMouseEnter={() => this.toggleMenu(true)} onMouseLeave={() => this.toggleMenu(false)}>
                {AccessRoutesStore.busy()}
                <div className={classes.logoDiv2} id="logo">
                  <div className={classes.logoDivImg} onClick={this.handleLogoClick}>
                    {/*<img
                      className={classes.logoImg2}
                      style={{
                        width: width > 69 ? 'auto' : 0
                      }}
                      src={logoWhite}
                      alt="Logo"
                    />*/}
                    {sidebar ? (
                      <img
                        className={classes.logoImg}
                        style={{
                          width: width > 0 ? 'auto' : 0
                        }}
                        src={sidebar}
                        alt="Incentive.me"
                      />
                    ) : (
                      <span className={classes.appName}>
                        {RealmStore.appName ? (width > 69 ? RealmStore.appName : RealmStore.appName.slice(0, 2)) : width > 69 ? 'Nome do Sistema' : 'NS'}
                      </span>
                    )}
                  </div>
                </div>
                <ScrollBar className={classes.scrollbar}>
                  {AccessRoutesStore.busy() ? (
                    <LinearLayout center padding={30}>
                      <CircularProgress className={classes.progress} />
                    </LinearLayout>
                  ) : (
                    <MenuList items={AccessRoutesStore.models} level={0} root onItemClick={this.handleItemClick} path={this.path} />
                  )}
                  <span className={classes.version}>{process.env.REACT_APP_VERSION}</span>
                </ScrollBar>
              </div>
            </SwipeableDrawer>
          )
        }
      }   
      `,
      errors: [
        {
          message: "Undefined style detected: styles.logoDiv2"
        },
        {
          message: "Unused style detected: styles.logoImg2"
        }
      ]
    }
  ]
});
