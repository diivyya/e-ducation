import React from 'react';
import CustomTabs from "components/CustomTabs/CustomTabs.js";

export default function ETaskBoard() {

    return (
        <div style={{minHeight:"100vh"}}>
            <CustomTabs
                plainTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Assesments",
                    tabContent: (
                      1
                    ),
                  },
                  {
                    tabName: "Offline Classes",
                    tabContent: (
                      2
                    ),
                  },
                ]}
            />
        </div>
    )
}
