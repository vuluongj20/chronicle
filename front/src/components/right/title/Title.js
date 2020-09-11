import React, { Component } from 'react';

import gsap from 'gsap';

import { ReactComponent as TwitterIcon } from '../../../assets/icons/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';
import { ReactComponent as LinkIcon } from '../../../assets/icons/link.svg';

import './Title.css';

const url = 'https://chronicle.vuluong.me';

const content = {
  head: "How the coronavirus took hold of the United States",
  des: "A look back at the unprecedented growth of the coronavirus pandemic."
}

class Title extends Component {
  constructor(props) {
    super(props)
    this.copyMessageRef = React.createRef();
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

  componentDidMount() {
    gsap.to('.title-head-word', {
        duration: 1.4,
        ease: 'expo.inOut',
        stagger: 0.04,
        y: 0
      }
    )
    gsap.to('.title-bar', {
      duration: 1.4,
      ease: 'expo.inOut',
      scaleX: 1
    })
    gsap.to(['.title-des', '.share-wrap'], {
      duration: 1.2,
      delay: 0.4,
      ease: 'expo.inOut',
      stagger: 0.04,
      opacity: 1
    })
  }

  render() {
    return (
      <div className="title-wrap">
        <div className="title-bar" />
        <h1 className="title-head">
          {content.head.split(' ').map((word, index) => {
            return (
              <span className="title-head-word-wrap" key={index}>
                <span className="title-head-word">{`${word} `}</span>
              </span>
            )
          })}
        </h1>
        <h4 className="title-des">A look back at the unprecedented growth of the coronavirus pandemic.</h4>
        <div className="share-wrap">
          <a
            className="share-button"
            href={`http://twitter.com/share?url=${url}&text=${content.head}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            className="share-button"
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            className="share-button"
            href={`https://www.linkedin.com/sharing/share-offsite?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </a>
          <a
            className="share-button"
            href={`mailto:?subject=${content.head}&body=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon />
          </a>
          <button
            className="share-button"
            onClick={() => this.copy(url)}
          >
            <LinkIcon />
          </button>
          <span className="copy-message" ref={this.copyMessageRef}>URL copied to clipboard</span>
        </div>
      </div>
    );
  }
}

export default Title;
