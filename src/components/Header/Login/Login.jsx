import React from 'react';
import {Modal, ModalBody} from 'reactstrap';
import LoginForm from "./LoginForm";

class Login extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    render() {
        return (
            <div>
                <button className="btn btn-success" type="button" onClick={this.toggleModal}>Login</button>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalBody>
                        <LoginForm />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Login