import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { motion } from "framer-motion";

export default function ArticleManagement() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [
    { label: "Add Article", icon: "pi pi-plus", path: "/articles/add" },
    { label: "Edit Article", icon: "pi pi-pencil", path: "/articles/edit" },
    { label: "View Article Details", icon: "pi pi-eye", path: "/articles/view" },
    { label: "Delete Article", icon: "pi pi-trash", path: "/articles/delete" },
    { label: "Publish Article", icon: "pi pi-upload", path: "/articles/publish" },
  ];

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowDialog(true);
  };

  const confirmAction = () => {
    toast.current.show({
      severity: "success",
      summary: "Action Confirmed",
      detail: `Navigating to ${selectedAction.label}`,
      life: 2000,
    });

    setTimeout(() => {
      navigate(selectedAction.path);
    }, 1500);

    setShowDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-100 px-4 py-10 flex justify-center items-center">
      <Toast ref={toast} />
      <Dialog
        header="Confirm Navigation"
        visible={showDialog}
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px", overflow: "hidden" }}
        className="rounded-xl shadow-2xl"
        onHide={() => setShowDialog(false)}
        footer={null}
        closable={false}
      >
        <div className="text-center px-4 py-6">
          <div className="text-rose-600 mb-3">
            <i className="pi pi-exclamation-triangle text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Proceed with "{selectedAction?.label}"?
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            You’re about to navigate to a different section. Are you sure you want to continue?
          </p>
      
          <div className="flex justify-center gap-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-outlined p-button-danger"
              onClick={() => setShowDialog(false)}
            />
            <Button
              label="Yes, Proceed"
              icon="pi pi-check"
              className="p-button-sm p-button-success"
              onClick={confirmAction}
            />
          </div>
        </div>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-white/40"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          📚 Article Management
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center bg-white hover:bg-teal-100 border border-gray-200 shadow-md rounded-xl py-6 transition-all duration-300 cursor-pointer"
              onClick={() => handleActionClick(action)}
            >
              <i
                className={`${action.icon} text-3xl text-teal-600 mb-3`}
                style={{ fontSize: "2rem" }}
              ></i>
              <span className="text-lg font-semibold text-gray-700">
                {action.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
