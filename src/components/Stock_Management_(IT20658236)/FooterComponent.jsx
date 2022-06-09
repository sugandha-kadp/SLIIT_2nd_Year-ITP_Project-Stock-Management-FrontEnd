import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <div id='info'>

                    </div>

                    <div id='follow'>

                    </div>

                    <div id='footerSpan'>
                        <span className="text-muted">© Auto Miraj (Pvt) Ltd. | All Rights Reserved </span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
