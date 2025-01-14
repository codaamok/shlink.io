import { FC, useState, useEffect, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { NavbarToggler } from 'reactstrap';
import Layout from '../../components/Layout';
import GettingStartedContent from '../../content/documentation/index.mdx';
import Footer from '../../components/Footer';
import DocsSearch from '../../components/DocsSearch';
import DocsMenu from '../../components/DocsMenu';
import { useCurrentPath } from '../../utils/pathUtils';

interface LeftMenuToggleProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const LeftMenuToggle: FC<LeftMenuToggleProps> = ({ collapsed, toggleSidebar }) => (
  <NavbarToggler className={classNames('docs-menu-toggle', { collapsed })} onClick={toggleSidebar}>
    <span />
    <span />
    <span />
  </NavbarToggler>
);

type SidebarState = 'initial' | 'displayed' | 'hidden';
const classesForState = (state: SidebarState) => {
  if (state === 'initial') {
    return null;
  }

  return { 'sidebar-visible': state === 'displayed', 'sidebar-hidden': state === 'hidden' };
};

const Documentation: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const currentPath = useCurrentPath();
  const [sidebarState, setSidebarVisible] = useState<SidebarState>('initial');
  const toggleSidebar = () => setSidebarVisible(sidebarState === 'displayed' ? 'hidden' : 'displayed');
  const leftMenuToggle = <LeftMenuToggle collapsed={sidebarState !== 'displayed'} toggleSidebar={toggleSidebar} />;

  useEffect(() => {
    sidebarState !== 'initial' && setSidebarVisible('hidden');
  }, [currentPath]);

  return (
    <Layout pageTitle="Documentation" leftMenuToggle={leftMenuToggle} noFooter>
      <div className="docs-wrapper">
        <div className={classNames('docs-sidebar', classesForState(sidebarState))}>
          <div className="top-search-box p-3">
            <DocsSearch />
          </div>

          <DocsMenu />
        </div>

        <div className="docs-content">
          <div className="container">
            <article className="docs-article">
              {children ?? <GettingStartedContent />}
            </article>
          </div>

          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
