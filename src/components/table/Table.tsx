import React, { useEffect } from "react";
import { CSSProperties } from "react";
import "./Table.style.scss";
import {
	FilterIcon,
	NextPageIcon,
	PreviousPageIcon,
	SortDownIcon,
	SortUpIcon,
} from "../../assest/icons";

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
interface Theme {
	columnStyles?: CSSProperties;
	rowStyles?: CSSProperties;
	primaryColor?: string;
	secondaryColor?: string;
	rowBgColor?: string;
	rowHoverColor?: string;
	rowSelectedColor?: string;
	evenRowColor?: string;
	oddRowColor?: string;
}
interface Separator {
	/*
	 * Visibility of the separator
	 */
	show: boolean;
	/*
	 * Color of the separator
	 */
	color: string;
}
interface Pagination {
	show?: boolean;
	page: number;
	rowsPerPage: number;
}
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
	theming: Theme;
	separator?: Separator;
	pagination?: Pagination;
}

function Table(props: TableProps) {
	const {
		columns = [],
		data = [],
		type = "static",
		fullWidth = true,
		theming = {},
		separator = {
			show: false,
			color: "#bfbfbf",
		},
	} = props;

	const [sorting, setSorting] = React.useState<
		{
			key: string;
			direction: "asc" | "desc" | "";
			status?: boolean;
		}[]
	>([]);

	const [columnFilter, setColumnFilter] = React.useState<{
		key: string;
		status: boolean;
	}>({ key: "", status: false });

	const [filtering, setFiltering] = React.useState<
		{
			key: string;
			type: string;
			value: string[];
		}[]
	>([]);

	const [pagination, setPagination] = React.useState<Pagination>({
		show: props.pagination?.show || false,
		page: props.pagination?.page || 0,
		rowsPerPage: props.pagination?.rowsPerPage || data.length,
	});
	const [tableData, setTableData] = React.useState<Data>(() => {
		// Add pagination logic here

		return data.slice(
			pagination.page,
			pagination.page + pagination.rowsPerPage
		);
	});

	const [operationData, setOperationData] = React.useState<Data>(data);

	useEffect(() => {
		if (sorting.length > 0 && sorting[0].status) {
			const sortedData = [...data].sort((a: any, b: any) => {
				if (sorting[0].direction === "asc") {
					return a[sorting[0].key] > b[sorting[0].key] ? 1 : -1;
				} else if (sorting[0].direction === "desc") {
					return a[sorting[0].key] < b[sorting[0].key] ? 1 : -1;
				} else {
					return 0;
				}
			});
			setOperationData(sortedData);
		} else {
			setOperationData(data);
		}
	}, [sorting]);

	useEffect(() => {
		setTableData(
			[...operationData].slice(
				pagination.rowsPerPage * pagination.page,
				pagination.rowsPerPage + pagination.rowsPerPage * pagination.page
			)
		);
	}, [pagination, operationData]);

	return (
		<div
			className={`react-table-suite-container ${fullWidth && "fw"} ${
				separator.show && "separator"
			}`}
			style={
				{
					"--primary-color": theming.primaryColor || "#2684ff",
					"--secondary-color": theming.secondaryColor || "#c4dbf9",
					"--row-bg-color": theming.rowBgColor || "#ffffff",
					"--row-hover-color": theming.rowHoverColor || "#e0e0e0",
					"--row-selected-color": theming.rowSelectedColor || "#f0f0f0",
					"--even-row-color": theming.evenRowColor
						? theming.evenRowColor
						: theming.rowBgColor || "#ffffff",
					"--odd-row-color": theming.oddRowColor
						? theming.oddRowColor
						: theming.rowBgColor || "#ffffff",
					"--separator-color": separator.color || "#bfbfbf",
				} as CSSProperties
			}
		>
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
											...theming.columnStyles,
										}}
									>
										<div className="react-table-suite-column-title">
											{title}
										</div>
										{columnFilter?.status === true &&
										columnFilter?.key === key ? (
											<div className="react-table-suite-column-filter-popover">
												{key}
											</div>
										) : null}

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
													<div
														className={`sort-icons-container ${
															sorting.find(
																({ key: sortKey }) => sortKey === key
															)?.status
																? "active"
																: ""
														}`}
													>
														<div
															className={`sort-icon-wrapper ${
																sorting.find(
																	({ key: sortKey }) => sortKey === key
																)?.direction === "asc"
																	? "active"
																	: ""
															}`}
														>
															{/* active */}
															<SortUpIcon
																className={`sort-icon up ${
																	sorting.find(
																		({ key: sortKey }) => sortKey === key
																	)?.direction === "asc"
																		? "active"
																		: ""
																}`}
																onClick={() => {
																	if (
																		sorting.find(
																			({ key: sortKey }) => sortKey === key
																		)?.direction === "asc"
																	) {
																		setSorting([
																			{
																				key,
																				direction: "",
																				status: false,
																			},
																		]);
																	} else {
																		setSorting([
																			{
																				key,
																				direction: "asc",
																				status: true,
																			},
																		]);
																	}
																}}
															/>
														</div>
														<div
															className={`sort-icon-wrapper ${
																sorting.find(
																	({ key: sortKey }) => sortKey === key
																)?.direction === "desc"
																	? "active"
																	: ""
															}`}
														>
															<SortDownIcon
																className={`sort-icon down ${
																	sorting.find(
																		({ key: sortKey }) => sortKey === key
																	)?.direction === "desc"
																		? "active"
																		: ""
																}`}
																onClick={() => {
																	if (
																		sorting.find(
																			({ key: sortKey }) => sortKey === key
																		)?.direction === "desc"
																	) {
																		setSorting([
																			{
																				key,
																				direction: "",
																				status: false,
																			},
																		]);
																	} else {
																		setSorting([
																			{
																				key,
																				direction: "desc",
																				status: true,
																			},
																		]);
																	}
																}}
															/>
														</div>
													</div>
												)}
												{filter?.show === true ? (
													<div className="filter-icons-container">
														<div className="filter-icon-wrapper">
															<FilterIcon
																className="filter-icon"
																onClick={() => {
																	setColumnFilter({
																		key,
																		status: true,
																	});
																}}
															/>
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
			{tableData.length > 0 ? (
				<div className="react-table-suite-row-container">
					{tableData.map((dataItem: any) => {
						return (
							<div
								className="react-table-suite-row"
								key={dataItem.id}
								style={{ ...theming.rowStyles }}
							>
								{columns.map(({ key, minWidth, show = true }) => {
									return show ? (
										<div
											className="react-table-suite-row-data-container"
											key={dataItem.id + key}
											style={{
												minWidth: minWidth ? `${minWidth}px` : "auto",
											}}
										>
											{dataItem[key]}
										</div>
									) : (
										<React.Fragment key={dataItem.id + key}></React.Fragment>
									);
								})}
							</div>
						);
					})}
				</div>
			) : (
				<div>No Data Found</div>
			)}
			{pagination.show && (
				<div className="react-table-suite-pagination-container">
					<div className="react-table-suite-pagination">
						<div
							className={`react-table-suite-pagination-button ${
								pagination.page === 0 ? "disabled" : ""
							}`}
							onClick={() => {
								if (pagination.page > 0) {
									setPagination((prev) => ({
										...prev,
										page: prev.page - 1,
									}));
								}
							}}
						>
							<PreviousPageIcon className="page-navigation-icon previous" />
						</div>
						<div className="react-table-suite-pagination-page">
							{pagination.page + 1} /
							{Math.ceil(data.length / pagination.rowsPerPage)}
						</div>
						<div
							className={`react-table-suite-pagination-button ${
								pagination.page + 1 >=
								Math.ceil(data.length / pagination.rowsPerPage)
									? "disabled"
									: ""
							}`}
							onClick={() => {
								if (
									pagination.page + 1 <
									Math.ceil(data.length / pagination.rowsPerPage)
								) {
									setPagination((prev) => ({
										...prev,
										page: prev.page + 1,
									}));
								}
							}}
						>
							<NextPageIcon className="page-navigation-icon next" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Table;
