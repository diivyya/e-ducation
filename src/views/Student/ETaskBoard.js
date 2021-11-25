/*
    ---------- E-Task on Student Dashboard -------------
*/
import React from 'react';

import CustomTabs from "components/CustomTabs/CustomTabs.js";

import Assessments from "./Assessments";
import OfflineClasses from "./OfflineClasses";
import InternshipAndPlacementBoard from "./InternshipAndPlacementBoard";

export default function ETaskBoard (props) {

    return (
        <div style={{minHeight:"100vh"}}>
            <CustomTabs
                plainTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Assessments",
                    tabContent: (
                      <Assessments profile={props.profile} />
                    ),
                  },
                  {
                    tabName: "Offline Classes",
                    tabContent: (
                      <OfflineClasses profile={props.profile} />
                    ),
                  },
                  {
                    tabName: "Internship and Placement",
                    tabContent: (
                      <InternshipAndPlacementBoard profile={props.profile} />
                    ),
                  },
                ]}
            />
        </div>
    )
}
