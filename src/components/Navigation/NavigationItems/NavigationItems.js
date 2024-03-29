import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            BurgerBuilder
        </NavigationItem>
        {props.isAuth
            ? <NavigationItem link="/orders" >Orders</NavigationItem>
            : null
        }
        {props.isAuth
            ? <NavigationItem link="/logout" >Logout</NavigationItem>
            : <NavigationItem link="/auth" >Authentication</NavigationItem>
        }

    </ul>
);

export default navigationItems;