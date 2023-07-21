
import React from 'react'
import "./notification.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';


function Notification() {
    const [display,setDisplay]=React.useState(false)
    

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={3} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

                {/* <h1>Notification</h1> */}
               

<div className="">
    <div className="row">
       
        <div className="col-lg-7 right">
            <div className="box shadow-sm rounded bg-white mb-3">
                <div className="box-title border-bottom p-3">
                    <h6 className="m-0">Recent</h6>
                </div>
                <div className="box-body p-0">
                    <div className="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                            <div className="text-truncate">Employee 1's Qatar id is about to expire</div>
                            <div className="small">Employee 1's Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center osahan-post-header">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 2's Qatar id is about to expire</div>
                            <div className="small">Employee 2's Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">4d</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="box shadow-sm rounded bg-white mb-3">
                <div className="box-title border-bottom p-3">
                    <h6 className="m-0">Earlier</h6>
                </div>
                <div className="box-body p-0">
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3 d-flex align-items-center bg-danger justify-content-center rounded-circle text-white">DRM</div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 3'd Qatar id is about to expire</div>
                            <div className="small">Employee 3'd Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div> 
                            <br />
                            <div className="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3"><img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 4'th Qatar id is about to expire</div>
                            <div className="small">Employee 4'th Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 5'th Qatar id is about to expire</div>
                            <div className="small">Employee 5'th Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">4d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                            <div>
                            <div className="text-truncate">Employee 6'th Qatar id is about to expire</div>
                            <div className="small">Employee 6'th Qatar id is about to expire who has taken 10 leaves this....</div>
                            </div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">4d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3 d-flex align-items-center bg-success justify-content-center rounded-circle text-white">M</div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 7'th Qatar id is about to expire</div>
                            <div className="small">Employee 7'th Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3"><img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 8'th Qatar id is about to expire</div>
                            <div className="small">Employee 8'th Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">3d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                        <div className="text-truncate">Employee 9'th Qatar id is about to expire</div>
                            <div className="small">Employee 9'th Qatar id is about to expire who has taken 10 leaves this....</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">4d</div>
                        </span>
                    </div>
                    <div className="p-3 d-flex align-items-center osahan-post-header">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                            <div>
                            <div className="text-truncate">Employee 10'th Qatar id is about to expire</div>
                            <div className="small">Employee 10'th Qatar id is about to expire who has taken 10 leaves this....</div>
                            </div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                                <button type="button" className="btn btn-light btn-sm rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-dots-vertical"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-delete"></i> Delete</button>
                                    <button className="dropdown-item" type="button"><i className="mdi mdi-close"></i> Turn Off</button>
                                </div>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">4d</div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-5 left">
            <div className="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                <div className="p-5">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="img-fluid" alt="Responsive image" />
                </div>
                <div className="p-3 border-top border-bottom">
                    <h5 className="font-weight-bold text-dark mb-1 mt-0">Abdur</h5>
                    <p className="mb-0 text-muted">QID:- 7878678697</p>
                    <p className="mb-0 text-muted">Indian</p>
                </div>
                <div className="p-3">
                    <div className="d-flex align-items-top mb-2">
                        <p className="mb-0 text-muted">Dep</p>
                        <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">CSE</p>
                    </div>
                    <div className="d-flex align-items-top">
                        <p className="mb-0 text-muted">Work Area</p>
                        <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">Devloper</p>
                    </div>
                </div>
            </div>

            {/* <div className="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                <div className="p-5">
                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="img-fluid" alt="Responsive image" />
                </div>
                <div className="p-3 border-top border-bottom">
                    <h5 className="font-weight-bold text-dark mb-1 mt-0">Abdur</h5>
                    <p className="mb-0 text-muted">QID:- 7878678697</p>
                    <p className="mb-0 text-muted">Indian</p>
                </div>
                <div className="p-3">
                    <div className="d-flex align-items-top mb-2">
                        <p className="mb-0 text-muted">Dep</p>
                        <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">CSE</p>
                    </div>
                    <div className="d-flex align-items-top">
                        <p className="mb-0 text-muted">Work Area</p>
                        <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">Devloper</p>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
</div>

             </div>
    </div>
    )
}

export default Notification
