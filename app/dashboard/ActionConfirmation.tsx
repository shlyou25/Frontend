'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import {
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

type Variant = 'danger' | 'warning' | 'info'

interface ActionConfirmationProps {
  open: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: Variant
  onConfirm: () => void
  onCancel: () => void
}

const VARIANT_STYLES: Record<Variant, {
  iconBg: string
  iconColor: string
  buttonBg: string
  buttonHover: string
  Icon: any
}> = {
  danger: {
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    buttonBg: 'bg-red-600',
    buttonHover: 'hover:bg-red-500',
    Icon: ExclamationTriangleIcon
  },
  warning: {
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    buttonBg: 'bg-yellow-600',
    buttonHover: 'hover:bg-yellow-500',
    Icon: ExclamationTriangleIcon
  },
  info: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    buttonBg: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-500',
    Icon: InformationCircleIcon
  }
}

const ActionConfirmation = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  onConfirm,
  onCancel
}: ActionConfirmationProps) => {
  const styles = VARIANT_STYLES[variant]
  const Icon = styles.Icon

  return (
    <Dialog open={open} onClose={onCancel} className="relative z-100">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="p-6 flex gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${styles.iconBg}`}
            >
              <Icon className={`h-6 w-6 ${styles.iconColor}`} />
            </div>

            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                {title}
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4">
            <button
              onClick={onCancel}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold
              text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={`rounded-md px-4 py-2 text-sm font-semibold text-white
              ${styles.buttonBg} ${styles.buttonHover}`}
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ActionConfirmation
