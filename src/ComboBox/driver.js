const ERR = {
    DISABLED : item => `Cannot trigger click on the "${item}"`
};

export default class ComboBoxDriver
{
    constuctor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        this.wrapper.simulate( 'blur' );
        return this;
    }

    onChangeInput()
    {
        return this;
    }
    onKeyDown()
    {
        return this;
    }

    onKeyPress()
    {
        return this;
    }

    onKeyUp()
    {
        return this;
    }

    onFocus()
    {
        return this;
    }

    onMouseOver()
    {
        return this;
    }

    onMouseOut()
    {
        return this;
    }

    onClickInput()
    {
        return this;
    }

    onClickOption()
    {
        return this;
    }

    onMouseOutOption()
    {
        return this;
    }

    onMouseOverOption()
    {
        return this;
    }

    onScroll()
    {
        return this;
    }
}
