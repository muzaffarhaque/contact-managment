import React, { useState } from 'react'
import './home.scss'
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'
import {ReadioSelect} from '../../components'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add,remove,update } from '../../redux/ContactSlice'
const Home : React.FC = () => {
    const dispach=useDispatch();
    const [show,setShow]=useState(false);
    const [edit,setEdit]=useState(null)
    const getReduxData=useSelector((stae:any)=>stae.contactDetails)
    function modelHandlear(){
        setShow(!show)
    }
    const editHandler=(data:any)=>{
        console.log(data)
        setEdit(data);
        setShow(!show)
    }
    const deleteHandler=(id:number)=>{
         dispach(remove(id));
    }
    return (
        <div>
            <div className="contact-header">
                <h5 className='fs-22-18 fw-bold mb-0'>Contact Details</h5>
                <div onClick={modelHandlear} className="primary-btn ">Create Contact</div>
            </div>
            <table className='main-table w-100'>
                <thead>
                    <tr className='table-head'>
                        <th className='fs-16-14 fw-600 ps-4'>Name</th>
                        <th className='fs-16-14 fw-600 ps-4'>Status</th>
                        <th className='fs-16-14 fw-600'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getReduxData?.map((item:any,i:number)=>{
                        return(
                            <tr key={i} className='table-body'>
                            <td className='fs-16-14 fw-500 ps-4'>{item.firstName} &nbsp;{item.lastName}</td>
                            <td className='fs-16-14 fw-500 ps-4'><div className="states-spot" style={{backgroundColor:item.status==="Active"?"greenyellow":"grey"}}></div> </td>
                            <td className='fs-16-14 fw-500 d-flex align-items-center h-100 gap-4'>
                                <BiEdit className="pointer text-primary" onClick={()=>editHandler(item)}/>
                                <AiFillDelete className="pointer text-danger" onClick={()=>deleteHandler(item.uuid)}/></td>
                        </tr>
                        )
                    })}
                  {
                    getReduxData.length<1 &&
                    <tr className='table-body'>
                        <td className=" w-100 text-center fs-18-14 fw-600 ps-4 py-5" colSpan={3}>There is no Contact Details </td>
                    </tr>
                  }
                    
                </tbody>
            </table>
           {show && <DetalsForm edit={edit} onClick={modelHandlear}/>} 
        </div>
    )
}

export default Home;
interface Props {
    edit:any,
    onClick: () => void;
}
type Option = {
    value: string;
    label: string;
};
const options : Option[] = [
    {
        value: 'Active',
        label: 'Active'
    }, {
        value: 'InActive',
        label: 'InActive'
    }
];
const DetalsForm: React.FC<Props> = ({edit=null,onClick }) => {
    // console.log("Updeted data",edit);
    const dispach=useDispatch()
    type details={
        firstName:string,
        lastName:string,
        status:string,
        uuid:number | null,
    }
    const [formInfo,setFormInfo]=useState<details>({firstName:edit?.firstName ||"",lastName:edit?.lastName || "",status:edit?.status || "",uuid:Date.now()});
    const { firstName, lastName, status,uuid } = formInfo;
   const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormInfo({...formInfo,[e.target.name]:e.target.value});
    // console.log(formInfo)
   }
   
    const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispach(add(formInfo));
        setFormInfo({firstName:"",lastName:"",status:"",uuid:null})
        onClick();
    }
    const updateHandler=(e: React.FormEvent<HTMLFormElement>)=>{
        // console.log("Update handler call");
        e.preventDefault();
        dispach(update({data:formInfo,id:edit.uuid}));
        setFormInfo({firstName:"",lastName:"",status:"",uuid:null});
        onClick();
    }
 
    return (
        <div className="form-moder">
            <form onSubmit={edit===null?submitHandler:updateHandler} className='form-wrapper d-flex flex-column gap-4'>
            <GrClose className='canle-form' onClick={onClick}/>
                <h5 className='fs-22-18 fw-bold mb-4'>Contact Details :-</h5>
                <div className=" w-100">
                    <h6 className='fs-18-14  w-100 fw-semibold mb-3'>First name :</h6>
                    <input type="text" required value={firstName} name='firstName' onChange={changeHandler} className='input-box w-100' placeholder='First name'/>
                </div>
                <div className=" w-100">
                    <h6 className='fs-18-14 w-100 fw-semibold mb-3'>Last name :</h6>
                    <input type="text" required value={lastName} name='lastName' onChange={changeHandler} className='input-box w-100' placeholder='Last name'/>
                </div>
                <ReadioSelect
                    options={options}
                    defaultSet={status}
                    onOptionChange={(data : string) => setFormInfo({...formInfo,status:data})}/>
                <Button type='submit' className='primary-btn mx-auto px-5'>{edit===null?"Submit":"Update"}</Button>
            </form>
        </div>
    );
}