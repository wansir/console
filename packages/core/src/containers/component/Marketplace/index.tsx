import React, { useEffect } from 'react';
import cx from 'classnames';
import { get } from 'lodash';
import { Link, useSearchParams } from 'react-router-dom';
import { FilterInput, Field, Loading } from '@kubed/components';
import { Templet, Bottom, Check } from '@kubed/icons';
import { useFetchCategories, useFetchComponents } from '../../../stores/component';
import {
  MarketHeader,
  MarketHeaderInner,
  MarketWrapper,
  TitleWrapper,
  Description,
  MainContent,
  ComponentList,
  ComponentSection,
  Categories,
} from './styles';

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const { data: categories } = useFetchCategories();
  const { data, isLoading, reFetch } = useFetchComponents({});
  console.log(data);

  useEffect(() => {
    reFetch({ 'labelSelector=extensions.kubesphere.io/category': category });
  }, [category]);

  return (
    <MarketWrapper>
      <MarketHeader>
        <MarketHeaderInner>
          <TitleWrapper>Components Marketplace</TitleWrapper>
          <Description>
            Use the components you love, right in KubeSphere. Explore available in-product
            components below!
          </Description>
          <FilterInput
            placeholder="search for components"
            className="components-search"
            simpleMode
          />
        </MarketHeaderInner>
      </MarketHeader>
      <MainContent>
        <Categories>
          <div className="section-title mb12">Categories</div>
          <div className="cate-list">
            <Link
              to="/components?category=all"
              className={cx('cate-link', { 'is-active': category === 'all' })}
            >
              <Templet variant={category === 'all' ? 'coloured' : 'dark'} />
              <span>All Categories</span>
            </Link>
            {categories &&
              categories.items.map((item: any) => {
                const cateName = get(item, 'metadata.name');
                const cateDisplayName = get(item, 'spec.displayName');
                const isActive = category === cateName;
                return (
                  <Link
                    key={cateName}
                    to={`/components?category=${cateName}`}
                    className={cx('cate-link', { 'is-active': isActive })}
                  >
                    <Templet variant={isActive ? 'coloured' : 'dark'} />
                    <span>{cateDisplayName}</span>
                  </Link>
                );
              })}
          </div>
        </Categories>
        <ComponentSection>
          <div className="section-title mb12">All Components</div>
          {isLoading ? (
            <Loading className="page-loading" />
          ) : (
            <ComponentList>
              {data?.map((item: any) => {
                return (
                  <Link
                    to={`/components/com-${item.name}`}
                    className="component-item"
                    key={item.name}
                  >
                    <Field
                      className="component-title"
                      avatar={<img src={item.icon} />}
                      label={item.description}
                      value={item.name}
                    />
                    <div className="component-footer">
                      <span className="version">Version: v{item.version}</span>
                      <div className="install-status">
                        <Bottom />
                        Install
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Link to="/a" className="component-item">
                <Field
                  className="component-title"
                  avatar={<img src="https://s.juicefs.com/static/jfs/logo.svg" />}
                  label="A helm chart for JuiceFS CSI Driver JuiceFS CSI Driver"
                  value="fpga-operator"
                />
                <div className="component-footer">
                  <span className="version">Version: v0.10.15</span>
                  <div className="install-status">
                    <Check variant="light" className="icon-installed" />
                    Installed
                  </div>
                </div>
              </Link>
            </ComponentList>
          )}
        </ComponentSection>
      </MainContent>
    </MarketWrapper>
  );
};

export default Marketplace;
