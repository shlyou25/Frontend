'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ConfirmationProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const Confirmation = ({ open, onConfirm, onCancel }: ConfirmationProps) => {
  return (
    <Dialog open={open} onClose={onCancel} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="p-6 flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>

            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                Confirm Delete
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this item? <br/>
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4">
            <button
              onClick={onCancel}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100 hover:cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default Confirmation
