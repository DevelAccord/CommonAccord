import React from 'react';
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
/*

fetch('//offline-news-api.herokuapp.com/stories')
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(stories) {
    console.log(stories);
  });
*/
const Directory = React.createClass({
  componentWillMount() {
    let items = fetch('/api')
      .then(
        (response) => response.json()
      )
      .then(
        (json) => {
          let items = []
          for (var x in json) {
            if( json.hasOwnProperty( x ) ) {
              console.log(x, json[x]);
              items.push({
                name: x,
              })
            }
          }
          return items;
        }
      )
      .resolve()

  },

  render() {
    const dir = this.props.params.splat;

    /*
    const items = [
      {class: 'fa-folder', link: '/doc/foobar', name: 'foobar'}
    ]
    */


    console.log(items)


    return (
      <div className="container">
        <div className="row">
          <div className="table-responsive">
            <h1>Directory: {dir}</h1>
            <table id="listr-table" className="table table-hover table-sm">
              <thead>
              <tr>
                <th className="text-xs-left" data-sort="string">
                  Name
                </th>
                <th className="text-xs-right" data-sort="int">
                  Size
                </th>
                <th className="text-xs-right" data-sort="int">
                  Modified
                </th>
              </tr>
              </thead>
              <tbody>
              {
                items.map((item) => {
                  return (
                    <tr>
                      <td className="text-xs-left" data-sort-value="dir-checksum">
                        <i className={"fa fa-fw "+item.class} />
                        <a href={item.link}>
                          <strong>
                            {item.name}
                          </strong>
                        </a>
                      </td>
                      <td className="text-xs-right" data-sort-value="-1">
                        —
                      </td>
                      <td className="text-xs-right" data-sort-value="12345" title='2016-01-28 22:23:06'>
                        1 month ago
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});


export default Directory
