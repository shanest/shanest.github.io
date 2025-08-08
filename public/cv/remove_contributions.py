import panflute as pf


def action(elem, doc):
    """Check whether the element is a list item that begins with "Contributions:"
    and remove it if so.
    """
    if isinstance(elem, pf.ListItem) or isinstance(elem, pf.Para):
        string_rep = pf.stringify(elem)
        if string_rep.startswith("Contribution:"):
            return []


def main(doc=None):
    return pf.run_filter(action, doc=doc)


if __name__ == "__main__":
    main()
