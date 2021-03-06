import React from 'react'
import { PropTypes } from 'prop-types'
import ReactMarkdown from 'react-markdown'

import Button from 'shared/components/button'
import styles from './index.module.css'

const CarouselProjectsItem = ({ icon, desc, link, image }) => (
  <div className={ styles.container }>
    <div className={ styles.leftContainer }>
      <div className={ styles.topContainer }>
        { icon && <div className={ styles.logo }>{ icon }</div> }
        <ReactMarkdown className={ styles.desc } source={ desc } />
      </div>
      <div className={ styles.bottomContainer }>
        <Button translationId="buttonLearnMore" href={ link } />
      </div>
    </div>
    <div className={ styles.rightContainer }><img src={ image } /></div>
  </div>
)

CarouselProjectsItem.propTypes = {
  icon: PropTypes.element,
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default CarouselProjectsItem
