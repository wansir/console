import React from 'react';
import styled from 'styled-components';
import { Divider, Group } from '@kubed/components';

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IntroArea = styled.div`
  padding: 24px 20px 24px 24px;
  background: url('/assets/about-bg.svg') no-repeat left top / auto 100% #f9fbfd;

  .description {
    margin: 0 0 12px 0;
  }
`;

const Logo = styled.div`
  margin-bottom: 12px;
  img {
    width: 200px;
    height: 40px;
  }
`;

const Footer = styled.div`
  padding: 20px 20px 20px 24px;
  overflow: hidden;

  .footer-left {
    float: left;
  }

  .github-links {
    a {
      display: inline-flex;
      img {
        margin-right: 4px;
      }
    }
  }

  .footer-right {
    float: right;
  }
`;

const About = () => {
  const { ksVersion } = globals.ksConfig;
  const { issueUrl, reposUrl, slackUrl } = globals.config;

  return (
    <AboutWrapper>
      <IntroArea>
        <Logo>
          <img src="/assets/logo.svg" alt="" />
        </Logo>
        <p className="description">{t('KS_DESCRIPTION')}</p>
        <strong className="version">
          KubeSphere {t('VERSION')} : {ksVersion}
        </strong>
      </IntroArea>
      <Footer>
        <div className="footer-left">
          <Group spacing={0} className="github-links">
            <a href={reposUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/github.svg" alt="github" />
              <strong>{t('REPS_ADDRESS')}</strong>
            </a>
            <Divider direction="vertical" height={14} margins={12} color="#d8dee5" />
            <a href={issueUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/bug.svg" alt="bug" />
              <strong>{t('ISSUE_FEEDBACK')}</strong>
            </a>
          </Group>
        </div>
        <div className="footer-right">
          <Group spacing={0} className="github-links">
            <a href={slackUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/slack.svg" alt="slack" />
              <strong>{t('PART_IN_DISCUSSION')}</strong>
            </a>
            <Divider direction="vertical" height={14} margins={12} color="#d8dee5" />
            <a href={reposUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/blue-theme-git.svg" alt="git" />
              <strong>{t('CODE_CONTRIBUTE')}</strong>
            </a>
            <Divider direction="vertical" height={14} margins={12} color="#d8dee5" />
            <a href={reposUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/star.svg" alt="star" />
              <strong>{t('GITHUB_STAR')}</strong>
            </a>
          </Group>
        </div>
      </Footer>
    </AboutWrapper>
  );
};

export default About;
