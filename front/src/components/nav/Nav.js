import React, { Component } from 'react';
import gsap from 'gsap';

import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';

import './Nav.css';

const url = 'https://chronicle.vuluong.me';
const content = {
  head: "How the coronavirus took hold of the United States",
  des: "A look back at the unprecedented growth of the coronavirus pandemic."
}

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showShareWrap: false,
    }
    this.copyMessageRef = React.createRef();
    this.toggleShareWrap = this.toggleShareWrap.bind(this)
    this.shareWrapKeyboardListener = this.shareWrapKeyboardListener.bind(this)
  }

  copy(url) {
    const textEl = document.createElement('textarea')
    textEl.value = url
    document.body.appendChild(textEl)

    textEl.select()
    textEl.setSelectionRange(0, 99999)
    document.execCommand("copy")

    document.body.removeChild(textEl)

    this.copyMessageRef.current.style.opacity = 1
    setTimeout(() => {
      this.copyMessageRef.current.style.opacity = 0
    }, 1000)
  }

  toggleShareWrap(to) {
    if (to) {
      this.setState({
        showShareWrap: to
      }, () => {
        document.getElementsByClassName('nav-share-outer-wrap')[0].style.pointerEvents = 'all'
        document.addEventListener('keydown', this.shareWrapKeyboardListener)
        document.body.style.overflow = 'hidden'
        gsap.to('.nav-share-wrap-background', {
          duration: 0.6,
          ease: 'power2.out',
          opacity: 0.32
        })
        gsap.fromTo('.nav-share-content-wrap',
        {
          y: '+=160'
        },
        {
          duration: 0.8,
          ease: 'expo.out',
          opacity: 1,
          y: '0'
        })
      })
    } else {
      this.setState({
        showShareWrap: to
      }, () => {
        document.getElementsByClassName('nav-share-outer-wrap')[0].style.pointerEvents = 'none'
        document.removeEventListener('keydown', this.shareWrapKeyboardListener)
        document.body.style.overflow = 'initial'
        gsap.to('.nav-share-wrap-background', {
          duration: 0.4,
          ease: 'power2.out',
          opacity: 0
        })
        gsap.fromTo('.nav-share-content-wrap',
        {
          y: '0'
        },
        {
          duration: 0.6,
          ease: 'expo.out',
          opacity: 0,
          y: '+=160'
        })
      })
    }
  }

  shareWrapKeyboardListener(e) {
    if (e.key === 'Escape') {
      this.toggleShareWrap()
    }
  }

  render() {
    const { showShareWrap } = this.state

    return (
      <nav className="nav-wrap">
        <div className="nav-inner-wrap">
          <a className="nav-app-name" href="/">Chronicle</a>
          <div className="nav-buttons">
            <button
              className="nav-button"
              onClick={() => this.toggleShareWrap(true)}
            >
              Share
            </button>
          </div>
        </div>
        <div className="nav-share-outer-wrap">
          <div
            className="nav-share-wrap-background"
            onClick={() => this.toggleShareWrap(false)}
          />
          <dialog className="nav-share-content-wrap">
            <h3 className="nav-share-head">Share</h3>
            <div className="nav-share-wrap">
              <a
                className="nav-share-button"
                href={`http://twitter.com/share?url=${url}&text=${content.head}`}
                tabIndex={showShareWrap ? 0 : -1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
              <a
                className="nav-share-button"
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                tabIndex={showShareWrap ? 0 : -1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                className="nav-share-button"
                href={`https://www.linkedin.com/sharing/share-offsite?url=${url}`}
                tabIndex={showShareWrap ? 0 : -1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
              <a
                className="nav-share-button"
                href={`mailto:?subject=${content.head}&body=${url}`}
                tabIndex={showShareWrap ? 0 : -1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmailIcon />
              </a>
              <button
                className="nav-share-button"
                onClick={() => this.copy(url)}
                tabIndex={showShareWrap ? 0 : -1}
              >
                <LinkIcon />
                <p className="copy-message hidden" ref={this.copyMessageRef}>URL copied to clipboard</p>
              </button>
            </div>
            <button
              className="nav-share-close-wrap no-padding"
              onClick={() => this.toggleShareWrap(false)}
            >
              <div className="nav-share-close-line first" />
              <div className="nav-share-close-line second" />
            </button>
          </dialog>
        </div>
      </nav>
    );
  }
}

export default Nav;
