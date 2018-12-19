import React from 'react';
// import styled from 'react-emotion';
import PropTypes from 'prop-types';

const ContactForm = ({title, message, sender, email}) => (
    <div>
        <form>
            <label>
                Nome:
                <input type="text" name="sender" />
            </label>
            <label>
                Email:
                <input type="text" name="email" />
            </label>
            <label>
                Título:
                <input type="text" name="title" />
            </label>
            <label>
                Mensagem:
                <input type="text" name="message" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>

);

export default ContactForm;

ContactForm.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    sender: PropTypes.string,
};