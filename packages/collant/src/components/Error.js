import { SuperError } from '@stereorepo/sac';

class CollantError extends SuperError {
    constructor(message) {
        super(message);
        this.name = '@stereorepo/collant';
    }
}

export default CollantError;
