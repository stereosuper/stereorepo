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
    toggleNoScroll({ transitionElement, noScroll }) {
        const removeScroll = () => {
            document.documentElement.style.top = `${-window.scrollY}px`;
            document.documentElement.classList.add('no-scroll');

            transitionElement.removeEventListener(
                'transitionend',
                removeScroll,
                false
            );
        };

        if (noScroll) {
            transitionElement.addEventListener(
                'transitionend',
                removeScroll,
                false
            );
        } else {
            const scrollY = Math.abs(
                parseInt(
                    document.documentElement.style.top.replace('px', ''),
                    10
                )
            );
            document.documentElement.style.top = '';
            document.documentElement.classList.remove('no-scroll');

            setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 0);
        }
    }
    makeTheDamnBurger() {
        this.state.burgerActivated = !this.state.burgerActivated;
        const [mainNav] = query({ selector: this.mainNavigationSelector });

        this.burger.classList.toggle('activated');
        mainNav.classList.toggle('activated');

        mainNav.setAttribute('aria-expanded', this.state.burgerActivated);
        this.toggleNoScroll({
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
