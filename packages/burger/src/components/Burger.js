import { query, windowComponent } from '@stereorepo/sac';

const burgerHandler = () => {
    const state = {
        burgerActivated: false
    };

    const burger = document.getElementById('burger');
    const mainNav = document.getElementById('main-navigation');

    if (!burger) return;

    const navigationToggle = () => {
        state.burgerActivated = !state.burgerActivated;
        burger.classList.toggle('activated');
        mainNav.classList.toggle('activated');

        mainNav.setAttribute('aria-expanded', state.burgerActivated);
        windowComponent.toggleNoScroll({
            transitionElement: mainNav,
            noScroll: state.burgerActivated
        });
    };
    burger.addEventListener('click', navigationToggle, false);

    const resizeHandler = () => {
        if (
            windowComponent.currentBreakpoint === 'xl' &&
            state.burgerActivated
        ) {
            navigationToggle();
        }
    };

    windowComponent.addResizeFunction(resizeHandler);
};

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

export default new Burger();
