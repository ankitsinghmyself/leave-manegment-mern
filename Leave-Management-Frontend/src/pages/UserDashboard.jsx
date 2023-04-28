import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from '../layouts/Sidebar';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import DateDiff from 'date-diff';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
  const [canceledLeaveCount, setCanceledLeaveCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [days, setDays] = useState(0);
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const [todaydate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [userData] = useState(JSON.parse(localStorage.getItem('user')));
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [leaveAllData, setAllLeaveData] = useState([]);
  const [user, setUser] = useState([]);
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    days: 0,
    userId: userData?._id,
  });

  const columns = [
    {
      name: 'Sr No.',
      selector: (row, i) => i + 1,
      sortable: true,
    },
    {
      name: 'Leave Type',
      selector: (row) => row.leaveType,
      sortable: true,
    },
    {
      name: 'Days',
      selector: (row) => row.days,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row) => moment(row.startDate).format('YYYY-MM-DD'),
      sortable: true,
    },
    {
      name: 'End Date',
      selector: (row) => moment(row.endDate).format('YYYY-MM-DD'),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => row.id,
      sortable: true,
      width: '20%',
      cell: (row) => (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              name="approved"
              disabled={row.status === 'approved' || row.status === 'canceled'}
              className="py-2 px-3 mb-0 font-bold text-white transition-all bg-red-600 rounded-full cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs disabled:bg-gray-500 disabled:cursor-default text-sm ease-in shadow-md"
              onClick={() => handleDelete(row)}
            >
              <i className="fas fa-trash "></i>
            </button>
          </div>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const pageProcess = async () => {
    setAllLeaveData([]);
    await getAllLeaves();
  };

  useEffect(() => {
    pageProcess();
  }, []);

  const getAllLeaves = async () => {
    if (userData == null) {
      navigate('/');
    } else {
      var totalApproved = 0;
      var totalCanceled = 0;
      var totalPending = 0;
      const res = await axios.get(
        'http://localhost:3300/api/account/getuserleaves?id=' + userData._id
      );
      const resUser = await axios.get(
        'http://localhost:3300/api/account/getuser?id=' + userData._id
      );
      if (res.status === 200) {
        setAllLeaveData(res.data);
        res.data.map((filteredLeave) => {
          if (filteredLeave.status === 'approved') totalApproved++;
          else if (filteredLeave.status === 'canceled') totalCanceled++;
          else totalPending++;
        });
        setApprovedLeaveCount(totalApproved);
        setCanceledLeaveCount(totalCanceled);
        setPendingLeaveCount(totalPending);
      }
      if (resUser.status === 200) {
        setUser(resUser.data[0]);
      }
    }
  };

  const handleChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'startDate') {
      setStartDate(new Date(moment(e.target.value).format('MM/DD/YYYY')));
    }
    if (e.target.name === 'endDate') {
      setEndDate(new Date(moment(e.target.value).format('MM/DD/YYYY')));
    }
  };

  useEffect(() => {
    var days = new DateDiff(new Date(endDate), new Date(startDate));
    setDays(days.days());
    if (days.days() > 0) {
      setLeaveData({
        ...leaveData,
        days: days.days(),
      });
    }
  }, [startDate, endDate, leaveData]);

  const handleSubmit = (e) => {
    axios
      .post('http://localhost:3300/api/account/addleave', leaveData)
      .then(function (response) {
        if (response.status === 200) {
          actionMessage('applied');
          setShowApplyLeave(false);
          getAllLeaves();
        }
      })
      .catch(function (error) {
        showErrorMessage(error.response.data.args);
      });
    e.preventDefault();
  };

  const handleDelete = async (row) => {
    const res = await axios.delete(
      'http://localhost:3300/api/account/deleteleave?userId=' +
        leaveData.userId +
        '&leaveId=' +
        row._id
    );
    if (res.status === 200) {
      actionMessage('deleted');
      getAllLeaves();
    }
  };

  const actionMessage = (message) => {
    swal({
      text: 'Leave ' + message + ' successfully.',
      icon: 'success',
      buttons: false,
      timer: 1000,
    });
  };
  const showErrorMessage = (message) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: message,
      toast: true,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="bg-gray-300 h-screen">
      <Sidebar />
      <div className="w-full pl-5 md:pl-20 pr-5 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Total Leaves
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {leaveAllData?.length}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500">
                      <i className="leading-none far fa-calendar-alt text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Approved Leaves
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {approvedLeaveCount}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-emerald-500 to-teal-400">
                      <i className="ni leading-none far fa-calendar-check text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Canceled Leaves
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {canceledLeaveCount}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-red-600 to-orange-600">
                      <i className="ni leading-none far fa-calendar-times text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Pending Leaves
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {pendingLeaveCount}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-orange-500 to-yellow-500">
                      <i className="ni leading-none far fa-calendar-minus text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-3">
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        {user?.gender == 'Male'
                          ? 'Paternity Leaves'
                          : 'Maternity Leave'}
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {user?.gender == 'Male'
                          ? user?.paternity
                          : user?.maternity}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500">
                      <i className="leading-none far fa-calendar text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Paid Leaves
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {user?.paid}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-emerald-500 to-teal-400">
                      <i className="ni leading-none far fa-calendar text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        rtt Leaves
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {user?.rtt}
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-red-600 to-orange-600">
                      <i className="ni leading-none far fa-calendar text-xl relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto px-0 pt-5 pb-2">
          <div className="pb-3">
            <button
              type="button"
              className="px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center text-white align-middle transition-all bg-blue-500 border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25"
              onClick={() => setShowApplyLeave(true)}
            >
              Apply Leave
            </button>
          </div>
          <div className="p-0 overflow-x-auto rounded-md">
            <DataTable
              title="Leave Records"
              columns={columns}
              data={leaveAllData}
              fixedHeader={true}
              defaultSortFieldId="id"
              defaultSortAsc={false}
              pagination
              striped={true}
              responsive={true}
              highlightOnHover
            />
          </div>
        </div>
      </div>
      <Modal
        open={showApplyLeave}
        showCloseIcon={false}
        center
        closeOnEsc={false}
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: 'auto',
          },
        }}
        onClose={() => setShowApplyLeave(false)}
      >
        <div className="inset-0 overflow-auto">
          <div className="flex items-end sm:items-center justify-center text-center sm:p-0">
            <div className="relative rounded-lg overflow-hidden text-left shadow-xl">
              <div className="w-full">
                <div className="text-lg text-left">Apply Leave</div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        name="startDate"
                        type="date"
                        defaultValue=""
                        placeholder=""
                        min={moment(todaydate).format('YYYY-MM-DD')}
                        onChange={(e) => handleChange(e)}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                      />
                      <label
                        htmlFor="startDate"
                        className={`absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                      >
                        Start Date
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        name="endDate"
                        type="date"
                        defaultValue=""
                        placeholder=""
                        min={moment(leaveData.startDate).format('YYYY-MM-DD')}
                        onChange={(e) => handleChange(e)}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                      />
                      <label
                        htmlFor="endDate"
                        className={`absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                      >
                        End Date
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="relative rounded-md">
                      <select
                        name="leaveType"
                        id="leaveType"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blur-500 peer"
                        onChange={(e) => handleChange(e)}
                      >
                        <option selected>Select Leave Type</option>
                        <option value="paid">Paid</option>
                        {userData && userData.gender == 'Male' ? (
                          <option value="paternity">Paternity</option>
                        ) : (
                          <option value="maternity">Maternity</option>
                        )}
                        <option value="rtt">RTT</option>
                      </select>
                      <label
                        htmlFor="leaveType"
                        className={`absolute text-md text-gray-500 dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blur-500 peer-focus:dark:text-blur-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                      >
                        Leave Type
                      </label>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 mt-1">
                        <i className="text-gray-500 fas fa-angle-down sm:text-md"></i>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        name="days"
                        type="number"
                        value={days}
                        placeholder=""
                        readOnly
                        onChange={(e) => handleChange(e)}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                      />
                      <label
                        htmlFor="days"
                        className={`absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                      >
                        Total Days
                      </label>
                    </div>
                  </div>
                  <div className="m-3 flex justify-between">
                    <div>
                      <button
                        className="rounded-lg text-base capitalize bg-blue-500 text-white font-medium py-2 px-8 mx-2"
                        onClick={() => setShowApplyLeave(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        className="rounded-lg text-base capitalize bg-blue-500 text-white font-medium py-2 px-8 mx-2"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
