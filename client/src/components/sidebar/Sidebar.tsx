import { useNavigate, useParams } from "react-router-dom";
import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton";
import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { useViews } from "@/context/ViewContext";
import useResponsive from "@/hooks/useResponsive";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ACTIVITY_STATE } from "@/types/app";
import { SocketEvent } from "@/types/socket";
import { VIEWS } from "@/types/view";
import { IoCodeSlash } from "react-icons/io5";
import { MdOutlineDraw } from "react-icons/md";
import cn from "classnames";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { tooltipStyles } from "./tooltipStyles";

function Sidebar() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get dynamic ID from URL
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews();
    const { minHeightReached } = useResponsive();
    const { activityState, setActivityState } = useAppContext();
    const { socket } = useSocket();
    const { isMobile } = useWindowDimensions();
    const [showTooltip, setShowTooltip] = useState(true);

    const changeState = () => {
        setShowTooltip(false);
        
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING);
            socket.emit(SocketEvent.REQUEST_DRAWING);
            navigate(`/drawing/${id || "default"}`); // Redirect to drawing page with ID
        } else {
            setActivityState(ACTIVITY_STATE.CODING);
            navigate(`/editor/${id || "default"}`); // Redirect to editor page with ID
        }

        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <aside className="flex max-w-[250px] md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 self-end overflow-hidden border-t border-darkHover bg-dark p-2 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4",
                    {
                        hidden: minHeightReached,
                    }
                )}
            >
                <SidebarButton viewName={VIEWS.FILES} icon={viewIcons[VIEWS.FILES]} />
                <SidebarButton viewName={VIEWS.CHATS} icon={viewIcons[VIEWS.CHATS]} />
                <SidebarButton viewName={VIEWS.RUN} icon={viewIcons[VIEWS.RUN]} />
                <SidebarButton viewName={VIEWS.CLIENTS} icon={viewIcons[VIEWS.CLIENTS]} />
                <SidebarButton viewName={VIEWS.SETTINGS} icon={viewIcons[VIEWS.SETTINGS]} />
                
                {/* Button to change activity state between Coding and Drawing */}
                <div className="flex items-center justify-center h-fit">
                    <button
                        className="flex items-center justify-center rounded transition-colors duration-200 ease-in-out hover:bg-[#3D404A] p-1.5"
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw size={30} />
                        ) : (
                            <IoCodeSlash size={30} />
                        )}
                    </button>
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-50"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                    
                </div>
            </div>
            <div
                className="absolute left-0 top-0 z-20 max-w-[200px] flex-col bg-dark md:static md:min-w-[200px]"
                style={isSidebarOpen ? {opacity: "1"} : { display: "none" }}
            >
                {/* Render the active view component */}
                {viewComponents[activeView]}
            </div>
        </aside>
    );
}

export default Sidebar;
