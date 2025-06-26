import React from 'react'
import useNavigation from '../utils/navigation'
import MenuOption from './MenuOption'
import { useAuthStore } from '../store/store'

export default function SideBar() {
  const location = window.location.pathname
  const { gotoHomePage, gotoAskQuestion, gotoBrowseTeams, gotoMyTeams, gotoUserProfile } = useNavigation()
  const { user } = useAuthStore()

  return (
    <div className="h-screen w-[20%] min-w-[200px] bg-gray-900 flex-none flex items-center">
      <div className="bg-gray-800 w-full border border-l-0 border-gray-700 h-[90vh] rounded-r-3xl flex flex-col">
        <h1 className="text-center text-gray-300 text-2xl font-bold mt-6">User</h1>
        <hr className="border-gray-700 my-6" />
        <div className="flex flex-col gap-4 pr-4">
          <MenuOption
            title="Homepage"
            action={gotoHomePage}
            selected={location === '/home'}
          />
          <MenuOption
            title="Ask a question"
            action={gotoAskQuestion}
            selected={location === '/ask-questions'}
          />
          <MenuOption
            title={"My Team"}
            action={gotoMyTeams}
            selected={location === '/my-teams'}
          />
          <MenuOption
            title={"Browse Teams"}
            action={gotoBrowseTeams}
            selected={location === '/browse-teams'}
          />
          <MenuOption
            title={"Profile"}
            action={() => gotoUserProfile(user.id)}
            selected={location === `/profile/${user.id}`}
          />
        </div>
      </div>
    </div>
  )
}
