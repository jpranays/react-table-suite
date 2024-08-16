import React from "react";
import "./Table.style.scss";
import { FilterIcon, SortDownIcon, SortUpIcon } from "../../assest/icons";

interface Column {
	/*
	 * Unique key for the column
	 */
	key: string;
	/*
	 * Title of the column
	 */
	title: string;
	/*
	 * Visibility of the column
	 */
	show?: boolean;
	/*
	 * Filter configuration of the column
	 */
	filter?: {
		/*
		 * Visibility of the filter
		 */
		show: boolean;
		/* Visibility of filter to show/hide in the global filter */
		showGlobalFilter: boolean;
	};
	/*
	 * Sort configuration of the column
	 */
	sort?: {
		/*
		 * Visibility of the sort
		 */
		show: boolean;
	};
	/*
	 * Minimum width of the column
	 */
	minWidth?: number;
	/*
	 * Resizable configuration of the column
	 */
	resizable?: boolean;
}
type Data = Array<any>;

interface TableProps {
	/*
	 * Type of the table
	 * Default: "static"
	 */
	type?: "static" | "dynamic";
	/*
	 * Columns of the table
	 */
	columns: Column[];
	data: Data[];
	/*
	 * Span the table to full width
	 * Default: true
	 */
	fullWidth?: boolean;
}

function Table(props: TableProps) {
	const { columns = [], data = [], type = "static", fullWidth = true } = props;
	return (
		<div className={`react-table-suite-container ${fullWidth && "fw"}`}>
			<div className="react-table-suite-column-container">
				{columns.map(
					({
						key,
						title,
						filter = {
							show: true,
						},
						sort = {
							show: true,
						},
						minWidth,
						resizable = false,
						show = true,
					}) => {
						return (
							<React.Fragment key={key}>
								{show === true && (
									<div
										className="react-table-suite-column"
										style={{
											minWidth: minWidth ? `${minWidth}px` : "auto",
										}}
									>
										<div className="react-table-suite-column-title">
											{title}
										</div>
										{/* <ColumnFilterPopover
										columnFilter={columnFilter}
										setColumnFilter={setColumnFilter}
										col={col}
										shiftRight={index === 0 ? true : false}
										shiftLeft={
											[
												columns.length - 1,
												columns.length - 2,
												columns.length - 3,
											].includes(index)
												? true
												: false
										}
										filter={filter}
										setFetchList={setFetchList}
										setFilter={setFilter}
									/> */}

										{/* {col.resizable === true && (
										<div
											// onMouseDown={() => mouseDown(index)}
											className={`resize-handle`}
										/>
									)} */}
										<div className="react-table-suite-column-icons-wrapper">
											{/* <div className="priority-container">
											{sort?.find(({ name }) => name === col.key)
												? sort?.find(({ name }) => name === col.key)?.priority
												: null}
										</div> */}

											<div className="react-table-suite-column-icons">
												{sort?.show === true && (
													// active
													<div className="sort-icons-container">
														<div className="sort-icon-wrapper">
															{/* active */}
															<SortUpIcon className="sort-icon up" />
														</div>
														<div className="sort-icon-wrapper">
															<SortDownIcon className="sort-icon down" />
														</div>
													</div>
												)}
												{filter?.show === true ? (
													<div className="filter-icons-container">
														<div className="filter-icon-wrapper">
															<FilterIcon className="filter-icon" />
														</div>
													</div>
												) : null}
											</div>
										</div>
									</div>
								)}
							</React.Fragment>
						);
					}
				)}
			</div>
			{data.length > 0 ? (
				<div className="react-table-suite-row-container">
					{data.map((dataItem: any) => {
						return (
							<div className="react-table-suite-row" key={dataItem.id}>
								{columns.map(({ key, minWidth, show = true }) => {
									console.log("====================================");
									console.log(show, dataItem, key);
									console.log("====================================");
									return show ? (
										<div
											className="react-table-suite-row-data-container"
											key={key}
											style={{
												minWidth: minWidth ? `${minWidth}px` : "auto",
											}}
										>
											{dataItem[key]}
										</div>
									) : (
										<></>
									);
								})}
							</div>
						);
					})}
				</div>
			) : (
				<div>No Data Found</div>
			)}
		</div>
	);
}

export default Table;
