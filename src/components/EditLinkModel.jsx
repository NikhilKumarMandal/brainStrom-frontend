import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileLink } from "../http/api";

export default function EditLinksModal({
  onClose,
  onSubmit,
  defaultLinks = {},
}) {
  const queryClient = useQueryClient();
  const [links, setLinks] = useState({
    gitHubLink: defaultLinks.gitHubLink || "",
    linkedinLink: defaultLinks.linkedinLink || "",
    xLink: defaultLinks.xLink || "",
    hashnodeLink: defaultLinks.hashnodeLink || "",
    otherLink: defaultLinks.otherLink || "",
  });

  const deleteMutation = useMutation({
    mutationFn: (linkKey) => deleteProfileLink(linkKey),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
    onError: () => {
      alert("Failed to delete link");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {};
    Object.entries(links).forEach(([key, value]) => {
      if (value.trim()) payload[key] = value.trim();
    });
    onSubmit(payload);
  };

  const handleDelete = (key) => {
    if (window.confirm(`Are you sure you want to delete ${key}?`)) {
      console.log(key);

      deleteMutation.mutate(key);
      setLinks((prev) => ({ ...prev, [key]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white space-y-4">
        <h2 className="text-xl font-semibold text-amber-400">
          Update Your Links
        </h2>
        {[
          "gitHubLink",
          "linkedinLink",
          "xLink",
          "hashnodeLink",
          "otherLink",
        ].map((field) => (
          <div key={field} className="flex items-center gap-2">
            <input
              name={field}
              value={links[field]}
              onChange={handleChange}
              placeholder={field.replace("Link", "") + " URL"}
              className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
            />
            {links[field] && (
              <MdDelete
                onClick={() => handleDelete(field)}
                className="text-red-500 hover:text-red-400 cursor-pointer text-xl"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-amber-700 px-4 py-1 rounded hover:bg-amber-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
