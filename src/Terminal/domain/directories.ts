import { TerminalDirectory, TerminalFile } from "./types";

export const startingDirectory: TerminalDirectory = {
    name: '',
    dateCreated: '2237-01-01 00:00:00',
    parent: null,
    subDirectories: ['documents', 'pictures', 'emails'],
    files: new Map<string, TerminalFile>()
}

export const directories: Map<string, TerminalDirectory> = new Map([
    [
        '/',
        {
            name: '',
            dateCreated: '2237-01-01 00:00:00',
            parent: null,
            subDirectories: ['documents', 'pictures', 'emails'],
            files: new Map<string, TerminalFile>()
        }
    ],
    [
        '/documents',
        {
            name: 'documents',
            dateCreated: '2237-01-12 00:00:00',
            parent: '/',
            subDirectories: ['guides', 'reports'],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'README.md',
                        {
                            name: 'README.md',
                            contents: 'Banana!',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/documents/guides',
        {
            name: 'guides',
            dateCreated: '2237-01-12 00:00:00',
            parent: '/documents',
            subDirectories: [],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'pythagorean_theorum.txt',
                        {
                            name: 'pythagorean_theorum.txt',
                            contents: 'The theorem can be written as an equation relating the lengths of the sides a, b and the hypotenuse c, sometimes called the Pythagorean equation:\n\na^2+b^2=c^2\n\nThe theorem is named for the Greek philosopher Pythagoras, born around 570 BC. The theorem has been proved numerous times by many different methods – possibly the most for any mathematical theorem. The proofs are diverse, including both geometric proofs and algebraic proofs, with some dating back thousands of years.',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/documents/reports',
        {
            name: 'reports',
            dateCreated: '2237-01-12 00:00:00',
            parent: '/documents',
            subDirectories: [],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'report1.md',
                        {
                            name: 'report1.md',
                            contents: 'Report 1!',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ],
                    [
                        'report2.md',
                        {
                            name: 'report2.md',
                            contents: 'Report 2!',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/pictures',
        {
            name: 'pictures',
            dateCreated: '2237-01-12 00:00:00',
            parent: '/',
            subDirectories: [],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'picture_1.png',
                        {
                            name: 'picture_1.png',
                            contents: 'Picture!',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ],
                    [
                        'cat.png',
                        {
                            name: 'cat.png',
                            contents: 'Cat!',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/emails',
        {
            name: 'emails',
            dateCreated: '2237-01-07 00:00:00',
            parent: '/',
            subDirectories: ['john'],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'little_italy.txt',
                        {
                            name: 'little_italy.txt',
                            contents: 'Date: 2337-06-04 00:00:00\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nGood luck,\n\n\nBarry',
                            creatorUsername: '00-status',
                            dateCreated: '2337-06-04 00:00:00',
                            dateModified: '2337-06-04 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/emails/john',
        {
            name: 'john',
            dateCreated: '2237-01-07 00:00:00',
            parent: '/emails',
            subDirectories: [],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'regarding_tuesday.txt',
                        {
                            name: 'regarding_tuesday.txt',
                            contents: 'From: matilda_grace\nDate: 2337-07-12 00:00:00\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nAll the best,\n\n\nMatilda Grace',
                            creatorUsername: '00-status',
                            dateCreated: '2337-06-04 00:00:00',
                            dateModified: '2337-06-04 00:00:00'
                        }
                    ],
                    [
                        'howdy_johno.txt',
                        {
                            name: 'howdy_johno.txt',
                            contents: 'From: geoff_broccoli\nDate: 2337-07-12 00:00:00\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nbuckle up,\n\n\nGeoff',
                            creatorUsername: '00-status',
                            dateCreated: '2337-06-04 00:00:00',
                            dateModified: '2337-06-04 00:00:00'
                        }
                    ],
                ]
            )
        }
    ],
]);
