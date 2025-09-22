/// <reference path="..\masterPage\masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#Section1Regular": $w.Section;
	"#section1": $w.ColumnStrip;
	"#Section1RegularMediaImage1": $w.Column;
	"#section1col2": $w.Column;
	"#Section1RegularTitle1": $w.Text;
	"#Section1RegularLongtext1": $w.Text;
	"#Section2Regular": $w.Section;
	"#columnStrip1": $w.ColumnStrip;
	"#column20": $w.Column;
	"#Section2RegularTitle1": $w.Text;
	"#Section2RegularLongtext1": $w.Text;
	"#socialBar3": $w.HiddenCollapsedElement;
	"#page1": $w.Page;
}