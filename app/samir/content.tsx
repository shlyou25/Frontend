import React from 'react'

const Content = () => {
  return (
   <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
    <ul className="space-y-2 font-medium">
      <li>
        <a href="#" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
          <svg className="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
          </svg>
          <span className="ms-3">Dashboard</span>
        </a>
      </li>
      <li>
        <button
          type="button"
          className="flex items-center w-full justify-between px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
        >
          <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
          </svg>
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
          <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
          </svg>
        </button>
        <ul id="dropdown-example" className="hidden py-2 space-y-2">
          <li>
            <a href="#" className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">Products</a>
          </li>
          <li>
            <a href="#" className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">Billing</a>
          </li>
          <li>
            <a href="#" className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">Invoice</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
          <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
          </svg>
          <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
          <span className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded-sm">Pro</span>
        </a>
      </li>
    </ul>
  </div>
  )
}

export default Content