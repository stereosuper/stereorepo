# ✨ SuperError

SuperError is not auto-instanciated. This class will help you to build cool custom errors.

For instance this components helps us to build the errors for all the @stereorepo 👌

To use it you'll have to import it and then extend your class with it 🔥

Example:

```js
import { SuperError } from '@stereorepo/sac';

class MyNewErrorClass extends SuperError {
    constructor(message) {
        super(message);
        this.name = '@stereorepo/my-new-package';
    }
}
```
