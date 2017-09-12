Component Description
---------------------

A Nessie Table component wraps a group of Nessie TableRow's containing Nessie TableCell's. It also provides a convenience method for building a table from a 2D array of strings.

On small screens the tables are re-arranged. For example, the following table:

    | Action | Date       | Comments     |
    |--------|------------|--------------|
    | Create | 2016/06/10 | Made a thing |
    | ...    | ...        | ...          |

becomes:

    | Action   | Create       |
    | Date     | 2016/06/10   |
    | Comments | Made a thing |
    |----------|--------------|
    | Action   | ...          |
    | Date     | ...          |
    | Comments | ...          |


Example Usage
-------------

Table built by wrapping Nessie TableRows:

    <Table>
        <TableRow>
            <TableCell isHeader size="1/4">Action</TableCell>
            <TableCell isHeader size="1/4">Date</TableCell>
            <TableCell isHeader size="1/2">Comments</TableCell>
        </TableRow>
        <TableRow>
            <TableCell size="1/4" columnTitle="Action">Create</TableCell>
            <TableCell size="1/4" columnTitle="Date">2016/06/10</TableCell>
            <TableCell size="1/2" columnTitle="Comments">Made a thing</TableCell>
        </TableRow>
        <TableRow>
            <TableCell size="1/4" columnTitle="Action">Delete</TableCell>
            <TableCell size="1/4" columnTitle="Date">2016/06/10</TableCell>
            <TableCell size="1/2" columnTitle="Comments">Erased a thing</TableCell>
        </TableRow>
        <TableRow>
            <TableCell size="1/4" columnTitle="Action">Edit</TableCell>
            <TableCell size="1/4" columnTitle="Date">2016/06/12</TableCell>
            <TableCell size="1/2" columnTitle="Comments">Modified a thing</TableCell>
        </TableRow>
        <TableRow>
            <TableCell size="1/4" columnTitle="Action">Create</TableCell>
            <TableCell size="1/4" columnTitle="Date">2016/06/15</TableCell>
            <TableCell size="1/2" columnTitle="Comments">Made another thing</TableCell>
        </TableRow>
    </Table>


or with columns defined in props:

    <Table columns = {
        [
            title       : 'Action',
            size        : '1/4',
            isSortable  : true
        ],
        [
            title       : 'Date',
            size        : '1/4',
            isSortable  : true
        ],
        [
            title       : 'Comments',
            size        : '1/2',
            isSortable  : false
        ]
    }>
        <TableRow>
            <TableCell>Create</TableCell>
            <TableCell>2016/06/10</TableCell>
            <TableCell>Made a thing</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Delete</TableCell>
            <TableCell>2016/06/10</TableCell>
            <TableCell>Erased a thing</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell>2016/06/12</TableCell>
            <TableCell>Modified a thing</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Create</TableCell>
            <TableCell>2016/06/15</TableCell>
            <TableCell>Made another thing</TableCell>
        </TableRow>
    </Table>


or built from a 2D array of strings:

    <Table columns  = { [
                            title       : 'Action',
                            size        : '1/4',
                            isSortable  : true
                        ],
                        [
                            title       : 'Date',
                            size        : '1/4',
                            isSortable  : true
                        ],
                        [
                            title       : 'Comments',
                            size        : '1/2',
                            isSortable  : false
                        ] }
           values   = { [
                            ["Create", "2016/06/10", "Made a thing"],
                            ["Delete", "2016/06/10", "Erased a thing"],
                            ["Edit",   "2016/06/12", "Modified a thing"],
                            ["Create", "2016/06/15", "Made another thing"]
                        ] }/>
