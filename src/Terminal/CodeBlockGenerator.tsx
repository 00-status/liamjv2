import { useEffect, useState } from 'react';
import './code-block-generator.css';

export const CodeBlockGenerator = () => {
    const [uniqueID] = useState<string>(crypto.randomUUID());
    const [snippet] = useState(getSnippet());

    const result = snippet.split("").map((character, index) => {
        const style = { "animationDelay": (0.2 + index / 10) + "s" };
        return <span className='character-span' aria-hidden key={uniqueID + "|" + index} style={style}>
            {character}
        </span>;
    });

    return <div className="code-block-generator">
        {result}
    </div>;
};

const getSnippet = (): string => {
    const choice = Math.floor(Math.random() * (4 - 1 + 1) + 1);

    switch (choice) {
        case 1:
            return generateCreateResourceRequest();
        case 2:
            return generateRequest();
        case 3:
            return generateVarAssignment();
        case 4:
            return generateIfStatement();
        default:
            return generateCreateResourceRequest();
    }
};

const generateVarAssignment = () => {
    return 'constant criminality = ' + crypto.randomUUID() + '\n';
};

const generateIfStatement = () => {
    return 'if (criminality === true) {\n\tthis.sendRequest()\n}\n';
};

const generateCreateResourceRequest = (): string => {
    return 'public function createResource()\n{\n\tconst identifier = this.generateID()\n\tthis.requestParam(identifier)\n}\n';
};

const generateRequest = () => {
    return 'public function sendRequest(BarbarosaProtocol $proxy)\n{\n\tthis.broker.loadProxy($proxy)\n\n\tif (this.request !== null) {\n\t\tthis.request.process()\n\t}\n\n}\n';
};
