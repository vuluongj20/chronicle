import React, { Component } from 'react';

// import { ReactComponent as Sneeze } from '../../assets/illustrations/sneeze.svg';
// import { ReactComponent as Laptop } from '../../assets/illustrations/laptop.svg';
// import { ReactComponent as Wash } from '../../assets/icons/wash.svg';
// import { ReactComponent as Topic } from '../../assets/icons/topic.svg';

import './Notes.css';

const content = {
  resources: {
    head: "Useful links",
    des: "It's important to keep yourself well informed and updated about the state of the pandemic. Here are some useful, easily accessible resources:",
    sections: [
      {
        iconIndex: 0,
        head: "Health guidelines",
        des: "The CDC published a dedicated website for health recommendations and guidelines.",
        links: [{
          text: "Visit the CDC",
          url: "https://www.cdc.gov/coronavirus/2019-ncov/"
        }]
      },
      {
        iconIndex: 1,
        head: "News sources",
        des: "Many online newspapers have made their coronavirus articles freely available to everyone.",
        links: [
          {
            text: "Visit The New York Times",
            url: "https://www.cdc.gov/coronavirus/2019-ncov/"
          },
          {
            text: "Visit The Washington Post",
            url: "https://www.cdc.gov/coronavirus/2019-ncov/"
          }
        ]
      }
    ]
  },
  feelingSick: {
    head: "Feeling sick?",
    des: "Apple and the CDC developed an online screening tool to help you better understand your symptoms and determine what to do next.",
    tool: {
      text: "Launch screening tool",
      url: "https://www.apple.com/covid19/"
    }
  },
  footnotes: [
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
        text: "Made possible with coronavirus data published by "
      },
      {
        type: "link",
        text: "the New York Times",
        url: "https://github.com/nytimes/covid-19-data"
      },
      {
        type: "text",
        text: ". For more information on data collection, read the descriptions in the Github repository."
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
}
class Notes extends Component {
  render() {
    return (
      <div className="notes-wrap">
        {/*<div className="ns-inner-wrap">
          <div className="ns-inner-inner-wrap">
            <Sneeze className="ns-sneeze" />
            <div className="ns-bar" />
            <div className="ns-text-wrap">
              <h2 className="ns-head">{content.feelingSick.head}</h2>
              <p className="ns-des">{content.feelingSick.des}</p>
              <a className="ns-link" href={content.feelingSick.tool.url}>{content.feelingSick.tool.text}</a>
            </div>
          </div>
        </div>*/}
        {/*<div className="ns-inner-wrap">
          <div className="ns-inner-inner-wrap">
            <Laptop className="ns-laptop" />
            <div className="ns-bar" />
            <div className="ns-text-wrap">
              <h2 className="ns-head">{content.resources.head}</h2>
              <p className="ns-des align-left">{content.resources.des}</p>
              {content.resources.sections.map((section, index) => {
                return (
                  <div key={index} className="ns-section-wrap">
                    <div className="ns-section-icon-wrap">
                      {section.iconIndex === 0 && <Wash className="ns-section-icon" />}
                      {section.iconIndex === 1 && <Topic className="ns-section-icon" />}
                    </div>
                    <div className="ns-section-content-wrap">
                      <h3 className="ns-section-head">{section.head}</h3>
                      <p className="ns-section-des">{section.des}</p>
                      {section.links.map((link, index) => {
                        return (
                          <div key={index} className="ns-section-link-wrap">
                            <a
                              className="ns-section-link"
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.text}
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>*/}
        <div className="ns-footer">
          <div className="ns-footnotes-wrap">
            {content.footnotes.map((note, index) => {
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

export default Notes;
