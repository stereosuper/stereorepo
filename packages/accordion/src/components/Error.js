import { SuperError } from '@stereorepo/sac';

class AccordionError extends SuperError {
    constructor(message) {
        super(message);
        this.name = '@stereorepo/accordion';
    }
}

export default AccordionError;
