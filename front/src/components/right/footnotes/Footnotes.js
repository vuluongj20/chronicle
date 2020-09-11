import React, { Component } from 'react';
import './Footnotes.css';

const content = [
  [
    {
      type: "text",
      text: "Made possible with coronavirus data published by "
    },
    {
      type: "link",
      text: "the New York Times",
      url: "https://github.com/nytimes/covid-19-data"
    },
    {
      type: "text",
      text: ", based on reports from state and local health agencies."
    },
  ],
  [
    {
      type: "text",
      text: "Designed and developed by "
    },
    {
      type: "link",
      text: "Vu Luong",
      url: "https://www.vuluong.me/"
    },
    {
      type: "text",
      text: "."
    },
  ],
  [
    {
      type: "text",
      text: "Illustrations from "
    },
    {
      type: "link",
      text: "Aum",
      url: "https://www.rawpixel.com/aum/"
    },
    {
      type: "text",
      text: "."
    },
  ]
]
class Footnotes extends Component {
  render() {
    return (
      <div className="footnotes-wrap">
        <div className="ft-inner-wrap">
          <div className="ft-content">
            {content.map((note, index) => {
              return (
                <p key={index} className="ns-footnote">
                  {note.map((span, index) => {
                    switch (span.type) {
                      case 'text':
                        return (
                          <span key={index}>{span.text}</span>
                        )
                      case 'link':
                        return (
                          <a
                            key={index}
                            href={span.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {span.text}
                          </a>
                        )
                      default:
                        return null
                    }
                  })}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Footnotes;
