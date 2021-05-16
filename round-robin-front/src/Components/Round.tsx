import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

interface Pair {
    white: { id: string, name: string },
    black: { id: string, name: string },
}

const Round: FunctionComponent<{ pairs: Pair[] }> = ({ pairs }) => {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> White </TableCell>
                        <TableCell> Black </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pairs.map(pair => (
                        <TableRow key={pair.black.id + pair.white.id}>
                            <TableCell>
                                {pair.white.name || <span style={{ color: 'red' }}> WAITING </span>}
                            </TableCell>
                            <TableCell>
                                {pair.black.name || <span style={{ color: 'red' }}> WAITING </span>}
                            </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Round;