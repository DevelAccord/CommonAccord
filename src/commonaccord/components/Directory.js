import React from 'react'
import { connect } from 'react-redux'

const Directory = ({ params }) => {
  const items = [
    {class: 'fa-folder', link: '/doc/foobar', name: 'foobar'}
  ]
  return (
    <div className="table-responsive">
      <h1>Directory: {params.splat}</h1>
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
  );
};

/*
.table-responsive
    table#listr-table.table.table-hover.table-sm
        thead
            tr
                th.text-xs-left(data-sort='string') Name
                th.text-xs-right(data-sort='int') Size
                th.text-xs-right(data-sort='int') Modified
        tbody
            each item in items
                tr
                    td.text-xs-left(data-sort-value='dir-checksum')
                        i.fa.fa-fw(class=item.class)
                        a(href=item.link)
                            strong= item.name
                    td.text-xs-right(data-sort-value='-1') —
                    td.text-xs-right(data-sort-value='1454019786', title='2016-01-28 22:23:06') 1 month ago

*/

export default Directory
