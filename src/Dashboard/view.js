import React,{useState,useEffect} from 'react'
import {CardContent, Grid,Card,CardHeader} from '@material-ui/core'
import Header from '../Header'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    TextField,MenuItem,InputLabel,Select,Button,
    FormControl,makeStyles} from '@material-ui/core'
import {Modal } from 'react-bootstrap'
import { Link ,useHistory,Redirect} from 'react-router-dom'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

toast.configure()
const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 100,
    },
  }));

const Dashboard =(props)=>{
    const [profiles,setProfiles] = useState([])
    const [candidate,setCandidate] = useState("")
    const [show,setShow] =useState(false)
    const [link,setLink] = useState()
    const [sort,setSort] = useState(false)
    const [filter,setFilter] = useState("")
    const [shortlisted,setShortlisted] = useState([])
    const [rejected,setrejected] = useState([])
    const [search,setSearch] = useState("")
    const [profiles1,setProfiles1] = useState([])
    
    const history = useHistory()
    const classes = useStyles();

    var url = "http://192.168.3.45:3056/resumes/"
    //get all profiles
    const getProfiles =()=>{
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response)=>{
                let i =0;
                response.data.map((ele)=>{
                    i=i+1;
                    return ele.slNo = i

                })
                console.log(response)
                setProfiles(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    //get single candidate profile for details
    const handleDetails=(id) =>{
        axios.get(`http://192.168.3.45:3056/api/profiles/${id}`)
        .then((response)=>{
            setCandidate(response.data)
            setShow(true)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    //handle shortlist and handle reject
    const handleshortlisted=(id)=>{
        const result = profiles.filter((ele)=>{
            return ele._id === id
        })
        result[0].prrofileStatus = 'shortlisted'
        result[0].updated_At = new Date()

        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`,result[0])
            .then((response)=>{
                getProfiles()
                toast.success("Shortlisted",{position: toast.POSITION.TOP_CENTER, autoClose : 1000 })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const handlerejected = (id) =>{
        const result = profiles.filter((ele)=>{
            return ele._id === id
        })
        result[0].prrofileStatus = 'rejected'
        result[0].updated_At = new Date()
        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`,result[0])
            .then((response)=>{
                getProfiles()
                toast.error("Rejected",{position: toast.POSITION.TOP_CENTER,autoClose : 1000})
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const onChangeFilter = (e,value) =>{
        setFilter(e.target.value)
        // setFilter('ALL')
       
    }

    const setValue = () =>{
       if(filter === 'ALL'){
           getProfiles()
       }
      
        if(filter !== 'ALL'){
            // getProfiles()
            const result = profiles.filter((ele)=>{
                return ele.role === filter
            })
            setProfiles(result)
        }
    }
            

    const role1 = [{name : 'MERN Developer', value : 'MERN Developer'},{name : 'Manual Tester', value : 'Manual Tester'},{name : 'Automation Tester', value : 'Automation Tester'}]
    
    const handleSort = (e) =>{
        setSort(!sort)
        setProfiles(profiles.reverse())
    }

    const handleClose=()=>{
        setLink()
        setShow(false)
    }

    useEffect(()=>{
        getProfiles()
    },[])

    useEffect(()=>{
        setValue()
        //getProfiles()
    },[filter])

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }

    const searchcandidate =(e)=>{
        const result = profiles.filter((ele)=>{
            return ele.firstName === search
        })
        setProfiles(result)
    }
    
        const shortlisted1 = profiles.filter((ele)=>{
            return ele.prrofileStatus ===  'shortlisted'
        })
        // setShortlisted(shortlisted1)
    
        const rejected1 = profiles.filter((ele)=>{
            return ele.prrofileStatus ===  'rejected'
        })
        // setrejected(rejected1)
        
    
    

    return(<div>
       <Header />
        <Grid container spacing={3} direction="row">
        <Grid item xs={12} sm={12}>
        </Grid>
        <Grid item xs={12} sm={12}>
        </Grid>
        <Grid item xs={12} sm={12}>
        </Grid>
       
        <Grid item xs={2} sm={2}></Grid>
        <Grid item xs={2} sm={2}>
            <div class="card" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title">Total Profiles</h5>
                <p class="card-text">{profiles.length}</p>
            </div>
            </div>
        </Grid>
        <Grid item xs={2} sm={2}>
            <div class="card" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title"> Shortlisted Profiles</h5>
                <p class="card-text">{shortlisted1.length}</p>
            </div>
            </div>
        </Grid>
        <Grid item xs={2} sm={2}>
            <div class="card" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title"> Rejected Profiles</h5>
                <p class="card-text">{rejected1.length}</p>
            </div>
            </div>
        </Grid>
        <Grid item xs={2} sm={2}>
            <div class="card" style={{width: "18rem"}}>
            <div class="card-body">
                <h5 class="card-title"> Pending Profiles</h5>
                <p class="card-text">{profiles.length}</p>
            </div>
            </div>
        </Grid>
        
        <Grid item xs={3} sm={3}>
        <TextField id="outlined-basic" label="search by first name" variant="outlined" size="small" value={search} onChange={handleSearch}/>&nbsp;<Button variant="contained" color="primary" onClick={searchcandidate}><SearchIcon/></Button>&nbsp;<Button variant="contained"  onClick={()=>{getProfiles() ;setSearch("")}}><RotateLeftIcon/></Button>
        </Grid>
        <Grid item xs={5} sm={5}></Grid>
        {/* <Grid item xs={5} sm={5}>
                
        </Grid> */}
        <Grid item xs={2} sm={2}>
       </Grid>
        <Grid item xs={2} sm={2}>
        <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filter}
                onChange={onChangeFilter}
                label="Filter"
                required="true"
                >
                <MenuItem value="ALL">
                    <em>All</em>
                    
                </MenuItem>
                    {
                        role1.map((exp)=>{
                            return( <MenuItem value={exp.value}>{exp.name}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
            </Grid>
        <Grid item xs={12} sm={12}>
        <table class="table table-bordered border-primary">
                <tr>
                    <th>Sl.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Applied Date {sort ? (<ArrowUpwardIcon fontSize="small" onClick={handleSort}/>):(<ArrowDownwardIcon fontSize="small" onClick={handleSort}/>)}</th>
                    <th>View Details</th>
                    <th>Updated At</th>
                   
                </tr>
                <tbody>
                    {
                        profiles.map((profile)=>{
                            return (<tr>
                                <td>{profile.slNo}</td>
                                <td onClick={()=>{
                                        handleDetails(profile._id)
                                }}>{profile.firstName}</td>
                                <td onClick={()=>{
                                        handleDetails(profile._id)
                                }}>{profile.lastName}</td>
                                <td  onClick={()=>{
                                        handleDetails(profile._id)
                                }}>{profile.role}</td>
                                <td  onClick={()=>{
                                        handleDetails(profile._id)
                                }}>{profile.created_At.slice(0,10)}</td>
                                {
                                        profile.prrofileStatus === "Applied" && (<td><button type="button" class="btn btn-success" onClick={()=>{
                                            handleshortlisted(profile._id)
                                        }}>Shortlist</button>&nbsp;<button type="button" class="btn btn-danger" onClick={()=>{
                                            handlerejected(profile._id)
                                        }}>Reject</button></td>)
                                    }
                                {
                                            profile.prrofileStatus === "rejected" && (<td><button type="button" class="btn btn-danger" disabled="true">rejected</button></td>)
                                    }
                                    {
                                            profile.prrofileStatus === "shortlisted" && (<td><button type="button" class="btn btn-primary" disabled="true">shortlisted</button></td>)
                                    }   
                                <td  onClick={()=>{
                                        handleDetails(profile._id)
                                }}>{profile.updated_At.slice(0,10)}</td>
                            </tr>)
                        })
                    }
                </tbody>
                </table>
        </Grid>
        </Grid>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{candidate.firstName} {candidate.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>First Name : {candidate.firstName}</p>
                    <p> Last Name: {candidate.lastName}</p>
                    <p> Role : {candidate.role}</p>
                    <p>Email : {candidate.email}</p>
                    <p>DOB :{candidate.Dob}</p>
                    <p>Mobile Number : {candidate.mobile}</p>
                    <p>Alternate Number : {candidate.alternatemob}</p>
                    <p> Experience: {candidate.experience}</p>
                    <p>Applied Date : {candidate.created_At}</p>
                    <p>Graduation year : {candidate.graduation}</p>
                    <p>Backlogs : {candidate.backlogs}</p>
                    <p>Current CTC : {candidate.ctc}</p>
                    <p>Available for Immediate Joining : {candidate.joining}</p>
                    <p>Profile Status : {candidate.prrofileStatus}</p> 
                    <p>Resume : {candidate.resume  ? (<a href={url + candidate.resume} target="_blank" rel="noopener noreferrer">show</a>):null}</p>
                    <p>{link}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={handleClose} >Close</button>
                </Modal.Footer>
            </Modal>
    </div>)
}

export default Dashboard

{/* <button onClick={()=>{
                        var l = "/home/pratheekk/Desktop/Apr-20/updated/hr-resume-bank-be/resumes/"+ candidate.resume
                        showresume(l)
                        
                    }}>view resume</button> */}
