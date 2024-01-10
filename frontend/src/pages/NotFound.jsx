import {Fragment} from 'react';
import './NotFound.css'


const notFound = () => (
    <Fragment>
        <div>
            
                <div className='notfound'>
                    <h1 className='notfound__heading'>404 Not Found</h1>
                    <p className='notfound__paragraph'>The link you requested does not exist on our website.</p>
                </div>
            
        </div>
    </Fragment>
);

export default notFound;
