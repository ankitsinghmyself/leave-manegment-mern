import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Sidebar from '../layouts/Sidebar';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [user, setUser] = useState([]);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
  const [canceledLeaveCount, setCanceledLeaveCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [userData] = useState(JSON.parse(localStorage.getItem('user')));
  const columns = [
    {
      name: 'Id',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'User Name',
      selector: (row) => row.firstname,
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
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: (row) => row.endDate,
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
              disabled={row.status === 'approved'}
              className="py-2 px-4 mb-0 font-bold text-white transition-all bg-green-600 rounded-full cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs disabled:bg-gray-500 disabled:cursor-default text-sm ease-in shadow-md"
              onClick={() => leaveAction(row, 'approved')}
            >
              <i className="fas fa-check "></i>
            </button>
            <button
              type="button"
              name="canceled"
              disabled={row.status === 'canceled'}
              className="py-2 px-4 mb-0 font-bold text-white transition-all bg-red-600 rounded-full cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs disabled:bg-gray-500 disabled:cursor-default text-sm ease-in shadow-md"
              onClick={() => leaveAction(row, 'canceled')}
            >
              <i className="fas fa-close text-lg"></i>
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
    setLeaveData([]);
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
        'http://localhost:3300/api/account/getallleaves'
      );
      if (res.status === 200) {
        console.log(res.data);
        setLeaveData(res.data);
        var userRecords = [];
        res.data.map((filteredLeave) => {
          if (filteredLeave.status === 'approved') totalApproved++;
          else if (filteredLeave.status === 'canceled') totalCanceled++;
          else totalPending++;
        });
        setApprovedLeaveCount(totalApproved);
        setCanceledLeaveCount(totalCanceled);
        setPendingLeaveCount(totalPending);
      }
    }
  };

  const leaveAction = async (row, action) => {
    const res = await axios.patch(
      'http://localhost:3300/api/account/updateleave',
      {
        status: action,
        leaveid: row.id,
      }
    );
    if (res.status == 200) {
      actionMessage(action);
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
                        {leaveData?.length}
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
        <div className="flex-auto px-0 pt-5 pb-2">
          <div className="p-0 overflow-x-auto rounded-md">
            <DataTable
              title="Leave Records"
              columns={columns}
              data={leaveData}
              selectableRows
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
    </div>
  );
}
