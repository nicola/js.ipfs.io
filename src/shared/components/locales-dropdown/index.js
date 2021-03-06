import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getDefaultLocale, getLocalesAcronym } from 'utils/getLocalesUtils'

import Link from 'shared/components/link'
import styles from './index.module.css'

class LocalesDropdown extends Component {
  state = {
    isOpen: false
  }

  constructor (props) {
    super(props)

    this.availableLocales = getLocalesAcronym()
    this.currentLocale = props.intl.locale
  }

  componentDidMount () {
    window.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleOutsideClick)
  }

  render () {
    const dropButtonClasses = classNames(styles.dropButton, {
      [styles.openedDropdown]: this.state.isOpen
    })
    const arrowClasses = classNames(styles.arrowIcon, styles.arrowBottom, {
      [styles.arrowBottom]: !this.state.isOpen,
      [styles.arrowTop]: this.state.isOpen
    })
    const dropdownContentClasses = classNames(styles.dropdownContent, {
      [styles.show]: this.state.isOpen
    })
    const defaultLocale = getDefaultLocale()

    const availableLocalesOptions = this.availableLocales.map((locale, index) => {
      const isSameLocale = locale === this.currentLocale

      if (isSameLocale) {
        return null
      }

      const to = defaultLocale === locale ? '/' : `/${locale}`

      return (
        <Link key={ index }
          to={ to }
          prefixLocale={ false }>
          { locale.toUpperCase() }
        </Link>
      )
    })

    return (
      <div className={ styles.dropdown }>
        <button className={ dropButtonClasses } onClick={ this.handleToggleDropdown }>
          { this.currentLocale.toUpperCase() }
          <span className={ arrowClasses } />
        </button>
        <div className={ dropdownContentClasses }>
          { availableLocalesOptions }
        </div>
      </div>
    )
  }

    handleToggleDropdown = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    handleOutsideClick = (event) => {
      const btnClass = `.${styles.dropButton}`

      if (!event.target.matches(btnClass) && this.state.isOpen) {
        this.setState({
          isOpen: false
        })
      }
    }
}

LocalesDropdown.propTypes = {
  intl: PropTypes.object.isRequired
}

export default injectIntl(LocalesDropdown)
