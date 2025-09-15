import TopBar from '@/components/topBar/TopBar';
import React from 'react';
import Workspace from '@/components/Workspace/Workspace'

// type pageProps = {
    
// };

const ProblemPage:React.FC = () => {
    
    return (
      <div>
        <TopBar ProblemPage/>
        <Workspace />
      </div>
    );
}
export default ProblemPage;