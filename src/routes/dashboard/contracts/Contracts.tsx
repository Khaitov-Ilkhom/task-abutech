import {Button, Input, Table, AutoComplete, Form, Select, Upload, type FormProps, message, Modal} from 'antd';
import type {TableProps} from 'antd';
import {
  useCreateContractMutation, useDeleteContractMutation, useEditContractMutation,
  useFileUploadMutation,
  useGetAllContractsQuery,
  useGetCoursesQuery, useGetSingleContractQuery
} from "../../../redux/api/contractApi.ts";
import {Contract, FileTypes} from "../../../types";
import moment from 'moment-timezone';
import {useEffect, useState} from "react";
import {IoSearch} from "react-icons/io5";
import {GrAttachment} from "react-icons/gr";

export type FieldTypeC = {
  title: string;
  courseId: string;
  attachmentId: FileTypes;
};

const Contracts = () => {
  const [form] = Form.useForm();
  const [uploadFiles, setUploadFiles] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState<any>([]);
  const [contractId, setContractId] = useState<number | any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {data, isFetching} = useGetAllContractsQuery({page: currentPage, perPage: pageSize});
  const allContracts = data?.data?.contracts;
  const {data: coursesdata} = useGetCoursesQuery();
  const courses = coursesdata?.data?.courses;
  const [upload, {data: uploadData, isSuccess, isError, isLoading}] = useFileUploadMutation();
  const [createContract, {isSuccess: createSuc, isError: createEr}] = useCreateContractMutation()
  const {
    data: singleContract,
    isSuccess: singleSuc,
    isError: singleEr
  } = useGetSingleContractQuery({id: contractId}, {skip: !contractId})
  const [updateContract, {isSuccess: editSuc, isError: editEr}] = useEditContractMutation();
  const [deleteContract, {isSuccess: deleteSuc, isError: deleteEr}] = useDeleteContractMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSearch = (value: string) => {
    const filtered = allContracts?.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleAutoComplete = (value: string) => {
    setSearchValue(value);

    const options = allContracts
        ?.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        )
        ?.map((item) => ({value: item.title}));

    setAutocompleteOptions(options || []);
  };

  const deletedCon = (item: Contract) => {
    deleteContract(item.id);
  }

  const columns: TableProps<Contract>['columns'] = [
    {
      title: "#",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Course Name',
      dataIndex: ["course", "name"],
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (item) => <div>{moment(item.createdAt).format("YYYY-MM-DD")}</div>,
    },
    {
      title: 'Action',
      render: (item) => (
          <div className="w-full flex justify-start items-center gap-2">
            <Button onClick={() => editContract(item)}>Edit</Button>
            <Button onClick={() => deletedCon(item)}>Delete</Button>
          </div>
      )
    }
  ];

  // submit form values
  const onFinish: FormProps<FieldTypeC>["onFinish"] = (values) => {
    if (contractId) {
      updateContract({
        body: {
          ...values,
          attachment: {size: uploadFiles.size, url: uploadFiles.path, origName: uploadFiles.fileName}
        }, id: contractId
      });
    } else {
      createContract({
        ...values,
        attachment: {size: uploadFiles.size, url: uploadFiles.path, origName: uploadFiles.fileName}
      });
    }
  };
  const onFinishFailed: FormProps<FieldTypeC>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const editContract = (item: Contract) => {
    setIsModalOpen(true);
    setContractId(item.id)
  };

  // upload file
  const uploadFile = ({file, fileList}: any) => {
    if (file.status !== "loading") {
      const formData = new FormData();
      fileList.forEach((file: any) => {
        formData.append("files", file.originFileObj);
      });
      upload(formData);
    }
  };

  // upload event
  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully uploaded file");
      setUploadFiles(uploadData?.data[0])
    }
    if (isError) {
      message.error("Error uploading file");
    }
  }, [isSuccess, isError, uploadData]);

  // create and edit branch event
  useEffect(() => {
    if (createSuc || editSuc) {
      setIsModalOpen(false);
      form.resetFields();
      message.success(createSuc ? "Successfully created branch" : "Successfully edited branch");
    }
    if (createEr || editEr) {
      setIsModalOpen(false);
      form.resetFields();
      message.error(createEr ? "Error creating branch" : "Error editing branch");
    }
  }, [createSuc, createEr, editSuc, editEr, form]);

  // single event
  useEffect(() => {
    if (singleSuc) {
      const contractData = {
        ...singleContract?.data,
        courseId: singleContract?.data?.course?.id,
        attachment: singleContract?.data?.attachment ? [{
          uid: '-1',
          name: singleContract.data.attachment.origName,
          status: 'done',
          url: singleContract.data.attachment.url,
        }] : [],
      };
      form.setFieldsValue(contractData);
    }
    if (singleEr) {
      message.error("Error fetching data");
    }
  }, [singleSuc, singleEr, form, singleContract]);

  // delete event
  useEffect(() => {
    if (deleteSuc) {
      message.success("Successfully deleted branch");
    }
    if (deleteEr) {
      message.error("Error deleting branch");
    }
  }, [deleteSuc, deleteEr]);

  return (
      <div className="rounded-lg bg-white">
        <div className="w-full flex justify-between items-center gap-4 px-4 bg-gray-200 rounded-t-lg py-4 pb-6">
          <div>
            <AutoComplete
                className="w-[400px]"
                options={autocompleteOptions}
                onSearch={handleAutoComplete}
                onSelect={handleSearch}
                value={searchValue}
            >
              <Input className="border-none !bg-gray-200 py-2 text-[16px]"
                     prefix={<IoSearch className="!text-[24px] text-gray-400"/>} placeholder="Qidiruv"/>
            </AutoComplete>
          </div>

          <div>
            <Button onClick={showModal}
                    className="!bg-[#0EB182] !text-white border-none active:scale-95">Qo'shish</Button>
          </div>
        </div>

        <Table<Contract>
            columns={columns}
            dataSource={
              filteredData
                  ? filteredData.map((item: any) => ({key: item.id, ...item}))
                  : allContracts?.map((item) => ({key: item.id, ...item}))
            }
            loading={isFetching}
            pagination={{
              current: currentPage,
              pageSize,
              total: data?.data?.total || 0,
              showSizeChanger: true,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
        />

        <Modal
            className="max-w-[450px] w-full"
            title="Shartnoma yaratish"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            footer={null}
        >
          <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              className="px-2 w-full"
          >
            <Form.Item<FieldTypeC>
                label="Kurs"
                name="courseId"
                rules={[{required: true, message: "Please select course!"}]}
            >
              <Select
                  placeholder="Tanlang"
                  optionFilterProp="label"
                  options={courses?.map((course) => ({
                    value: course.id,
                    label: course.name,
                  }))}
              />
            </Form.Item>

            <Form.Item<FieldTypeC>
                label="Nomi"
                name="title"
                rules={[{required: true, message: "Please input title!"}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item<FieldTypeC>
                rules={[{required: true, message: "Please upload file"}]}
            >
              <Upload
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={uploadFile}
              >
                <Button className="w-full !bg-gray-50 !border-dotted !border-gray-400 !text-[#0EB182] py-5"
                        type="primary">
                  <GrAttachment/> <span>Fayl biriktiring</span>
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label={null} className="w-full flex justify-end items-center gap-4">
              <Button onClick={handleCancel} className="!bg-white !text-black !border-gray-400" htmlType="submit">
                Bekor qilish
              </Button>
              <Button disabled={isLoading} className="border-none !text-white !bg-[#0EB182] ml-4" htmlType="submit">
                Saqlash
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default Contracts;