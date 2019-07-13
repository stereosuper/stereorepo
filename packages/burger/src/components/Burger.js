import { query, windowComponent } from '@stereorepo/sac';

class Burger {
    constructor({
        burgerSelector = '.js-burger',
        mainNavigationSelector = '.js-main-navigation'
    }) {
        this.state = {
            burgerActivated: false
        };

        this.burgerSelector = burgerSelector;
        this.mainNavigationSelector = mainNavigationSelector;
    }
    makeTheDamnBurger() {
        this.state.burgerActivated = !this.state.burgerActivated;
        const [mainNav] = query({ selector: this.mainNavigationSelector });

        this.burger.classList.toggle('activated');
        mainNav.classList.toggle('activated');

        mainNav.setAttribute('aria-expanded', this.state.burgerActivated);
        windowComponent.toggleNoScroll({
            transitionElement: mainNav,
            noScroll: this.state.burgerActivated
        });
    }
    thisBurgerIsTooFat() {
        if (
            windowComponent.currentBreakpoint === 'xl' &&
            this.state.burgerActivated
        ) {
            this.makeTheDamnBurger();
        }
    }
    bigMacOrWhopper() {
        const [burger] = query({ selector: this.burgerSelector });
        this.burger = burger;

        if (!burger) return;

        burger.addEventListener(
            'click',
            () => {
                this.makeTheDamnBurger();
            },
            false
        );

        windowComponent.addResizeFunction(this.thisBurgerIsTooFat);
    }
}

export default Burger;
