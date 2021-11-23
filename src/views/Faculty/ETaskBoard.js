import React from 'react';
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import Assessments from "./Assessments";
import OfflineClasses from "./OfflineClasses";

export default function ETaskBoard(props) {
    
  return (
    <div style={{minHeight:"100vh"}}>
        <CustomTabs
            plainTabs
            headerColor="info"
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
            ]}
        />
    </div>
    )
}
